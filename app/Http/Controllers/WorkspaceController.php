<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Http\Resources\WorkspaceSidebarResource;
use App\Models\User;
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

        $workspace = $request->user()->workspaces()->create([
            'name' => $request->name,
            'slug' => str()->slug($request->name, str()->uuid(10)),
            'cover' => $this->uploadFile($request, 'cover', 'workspaces/cover'),
            'logo' => $this->uploadFile($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility
        ]);

        $workspace->members()->create([
            'user_id' => $request->user()->id,
            'role' => $workspace->user_id == $request->user()->id ? 'owner' : 'member'
        ]);

        flashMessage('Workspace created successfully', 'success');
        return to_route('workspaces.show', $workspace);
        // return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace)
    {
        return inertia(component: 'Workspaces/Show', props: [
            'showWorkspace' => fn() => new WorkspaceResource($workspace)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workspace $workspace)
    {
        return inertia(component: 'Workspaces/Setting', props: [
            'editWorkspace' => fn() => new WorkspaceResource($workspace),
            'page_settings' => [
                'title' => 'Setting Workspace',
                'subtitle' => 'Fill out this form to add a new workspace',
                'method' => 'PUT',
                'action' => route('workspaces.update', $workspace),
            ],
            'visibilities' => WorkspaceVisibility::option()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Workspace $workspace, WorkspaceRequest $request)
    {
        $workspace->update([
            'name' => $request->name,
            'slug' => str()->slug($request->name, str()->uuid(10)),
            'cover' => $request->hasFile('cover') ? $this->uploadFile($request, 'cover', 'workspaces/cover') : $workspace->cover,
            'logo' => $request->hasFile('logo') ? $this->uploadFile($request, 'logo', 'workspaces/logo') : $workspace->logo,
            'visibility' => $request->visibility
        ]);

        flashMessage('Succesfully updated workspace');
        return to_route('workspaces.show', $workspace);
    }

    
    public function member_store(Workspace $workspace, Request $request)
    {
        $request->validate([
           'email' => ['required', 'email', 'string'] 
        ]);

        $user = User::query()->where('email', $request->email)->first();

        if (!$user) {
            flashMessage('Unregistered user', 'error');
            return back();
        }

        if($workspace->members()->where('user_id', $user->id)->exists()) {
            flashMessage('User already exists', 'error');
            return back();
        }

        $workspace->members()->create([
            'user_id' => $user->id,
            'role' => 'member'
        ]);

        flashMessage('Succesfully added member to workspace');
        return back();
    }

    public function member_destroy(string $id)
    {
        //
    }
}
