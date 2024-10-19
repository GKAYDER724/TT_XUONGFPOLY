<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use App\Models\SupportTicket;
use Illuminate\Database\Eloquent\Factories\Factory;

class SupportTicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SupportTicket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(10),
            'content' => fake()->text(),
            'priority' => 'medium',
            'department_id' => \App\Models\Department::factory(),
            'user_id' => \App\Models\User::factory(),
        ];
    }
}
