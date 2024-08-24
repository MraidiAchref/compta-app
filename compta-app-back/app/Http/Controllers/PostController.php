<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Request $request)
    {
        // Validate and process the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        // Example response
        return response()->json([
            'message' => 'Data received successfully!',
            'data' => $validatedData,
        ], 200);
    }
    public function show()
    {
    
        return response()->json("true", 200);
    }
}
