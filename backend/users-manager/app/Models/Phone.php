<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Phone extends Model
{
    protected $fillable = [
        'countryCode',
        'areaCode',
        'number',
    ];

    protected $attributes = [
        'countryCode' => 55,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
