<?php

namespace App\Filament\Resources\Panel\PostResource\Pages;

use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\Panel\PostResource;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;
}
