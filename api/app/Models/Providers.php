<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Providers extends Model
{
    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'provider_id';

    protected $fillable = [
        'provider_name',
        'provider_address'
    ];

    public function orders()
    {
        return $this->hasMany(Products::class, 'provider_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'user_id');
    }
}
