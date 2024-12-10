<?php 

namespace App\Enums;

enum CardPriority: string
{
    case URGENT = "Urgent";
    case LOW = "Low";
    case MEDIUM = "Medium";
    case HIGH = "High";
    case UNKOWN = "Unknown";
    
    public static function option(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}