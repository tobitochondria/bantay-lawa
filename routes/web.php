<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('MapPage'));

Route::get('/admin/dashboard', fn () => Inertia::render('Administrator/DashboardPage'));

Route::get('/org/dashboard', fn () => Inertia::render('Organization/DashboardPage'));

Route::get('/contributor/dashboard', fn () => Inertia::render('Contributor/DashboardPage'));

