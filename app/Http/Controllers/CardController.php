<?php

namespace App\Http\Controllers;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use App\Http\Requests\CardRequest;
use App\Models\Cards;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardController extends Controller
{
    public function ordering(Workspace $workspace, string $status)
    {
        $last_card = Cards::query()
            ->where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderBy('order', 'desc')
            ->first();

        if($last_card == null) return 1;
        return $last_card->order + 1;
    }

    public function create(Workspace $workspace)
    {
        return Inertia('Cards/Create', [
            'page_settings' => [
                'title' => 'Create Card',
                'subtitle' => 'Fill out this form to add a new card',
                'method' => 'POST',
                'action' => route('card.store', $workspace),
            ],
            'status' => request()->status ?? 'To do',
            'Statuses' => CardStatus::option(),
            'priority' => request()->priority ?? CardPriority::UNKOWN->value,
            'Priorities' => CardPriority::option(),
            'workspaceslug' => fn() => $workspace->only('slug')
        ]);
    }

    public function store(Workspace $workspace, Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'deadline' => 'required|string|max:255',
            'priority' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        $card = $request->user()->cards()->create([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $request->status,
            'order' => $this->ordering($workspace, $request->status),
            'priority' => $request->priority
        ]);

        flashMessage('Card created successfully', 'success');
        // return to_route('cards.edit', [$workspace, $card]);
    }
}
