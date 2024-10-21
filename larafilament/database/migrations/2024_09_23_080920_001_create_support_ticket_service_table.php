<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('support_ticket_service', function (Blueprint $table) {
            $table->bigInteger('support_ticket_id')->unsigned();
            $table->bigInteger('service_id')->unsigned();

            $table
                ->foreign('support_ticket_id')
                ->references('id')
                ->on('support_tickets')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table
                ->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('support_ticket_service');
    }
};
