<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'card_id',
        'parent_id',
        'title',
        'is_completed',
    ];

    protected $with = ['card', 'children', 'user'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cards(): BelongsTo
    {
        return $this->belongsTo(Cards::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function children(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_id');
    }
}
