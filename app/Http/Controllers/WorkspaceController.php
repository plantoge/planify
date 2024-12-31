<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceSidebarResource;
use App\Models\Workspace;
use App\Traits\HasFile;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceController extends Controller
{
    use HasFile;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function create(): Response
    {
        return Inertia::render('Workspaces/Create', props: [
            'page_settings' => [
                'title' => 'Create Workspace',
                'subtitle' => 'Fill out this form to add a new workspace',
                'method' => 'POST',
                'action' => route('workspaces.store'),
            ],
            'visibilities' => WorkspaceVisibility::option()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkspaceRequest $request)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'cover' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'logo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'visibility' => 'required|in:public,private'
        // ]);

        $request->user()->workspaces()->create([
            'name' => $request->name,
            'slug' => str()->slug($request->name, str()->uuid(10)),
            'cover' => $this->uploadFile($request, 'cover', 'workspaces/cover'),
            'logo' => $this->uploadFile($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility
        ]);

        flashMessage('Workspace created successfully', 'success');
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
