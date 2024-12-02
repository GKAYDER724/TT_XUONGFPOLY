@extends('filament::page')

@section('content')
    <h1>{{ $record->title }}</h1>
    <p>{{ $record->content }}</p>

    <h2>Phản hồi:</h2>
    <ul>
        @foreach ($record->subTickets as $subTicket)
            <li>
                <strong>{{ $subTicket->created_at }}:</strong> {{ $subTicket->content }}
            </li>
        @endforeach
    </ul>

    <h2>Trả lời:</h2>
    <form method="POST" action="{{ route('filament.support-tickets.reply', $record) }}">
        @csrf
        <textarea name="content" required></textarea>
        <button type="submit">Gửi phản hồi</button>
    </form>
@endsection
