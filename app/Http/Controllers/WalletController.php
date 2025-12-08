<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $wallets = $user->wallets()->get();
        $transactions = $user->transactions()
            ->latest()
            ->take(10)
            ->get();

        return response()->json([
            'wallets' => $wallets,
            'transactions' => $transactions
        ]);
    }

    public function transfer(TransferRequest $request)
    {
        // Handle wallet transfers
    }

    public function swap(SwapRequest $request)
    {
        // Handle currency swaps
    }
}
