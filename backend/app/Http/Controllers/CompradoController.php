<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comprado;
use App\Mail\EnvioCorreosMailable;
use Illuminate\Support\Facades\Mail;
class CompradoController extends Controller
{
    
    /* ------ Mostrar todo ------ */

    public function index()
    {
        $comprados = Comprado::all();
        return response()->json($comprados); 
    }

        /* ------ Crear ------ */

    public function store(Request $request)
    {

        $comprados = new Comprado([
            'asientos' => $request->input('asientos'),
            'sala' => $request->input('sala'),
            'cliente' => $request->input('cliente'),
            'pelicula' => $request->input('pelicula'),
            'horario' => $request->input('horario'),
        ]);

        if ($comprados->save()) {

            return response()->json([
                'message'=> 'Pelicula creada',
            ], 201);

        } else {
            return response()->json([
                'message'=> 'Error al crear la pelicula',
            ], 400);
        }
    }

        /* ------ Buscar Pelicula ------ */

    public function show($id)
    {
        // return response()->json(['status' => true, 'data' => $pelicula]);

        $comprados = Comprado::find($id);
        return response()->json($comprados);
    }

        /* ------ Actualizar ------ */

    public function update(Request $request, $id)
    {

        $comprados = Comprado::find($id);
        $comprados->update($request->all());
        return response()->json('Datos de la pelicula actualizados!');
    }

        /* ------ Eliminar ------ */

    public function destroy($id)
    {
        /* $pelicula->delete();
        return response()->json([
            'status' => false,
            'message' => 'Pelicula borrada correctamente'
        ],200); */

        $comprados = Comprado::find($id);
        $comprados->delete();
        return response()->json('pelicula eliminada!');
    }
    
    /*  public function all(Pelicula $pelicula)
    {
        $peliculas = Pelicula::select('peliculas.*')->get();
        return response()->json($peliculas);
    } */

    public function send(Request $request)
    {
        Mail::to('victor@codersfree.com')->send(new EnvioCorreosMailable($request -> all()));
        return "Mensaje enviado";
    }
}