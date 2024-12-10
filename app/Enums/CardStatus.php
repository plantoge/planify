<?php 

namespace App\Enums;

enum CardStatus: string
{
    case TODO = "Todo";
    case IN_PROGRESS = "In Progress";
    case ONREVIEW = "On Review";
    case DONE = "Done";

    public static function option(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}