<?php

namespace App\Http\Controllers;

use App\Models\Pelicula;
use Illuminate\Http\Request;

class PeliculaController extends Controller
{

        /* ------ Mostrar todo ------ */

    public function index()
    {
        $peliculas = Pelicula::all();
        return response()->json($peliculas); 
    }

        /* ------ Crear ------ */

    public function store(Request $request)
    {

        $peliculas = new Pelicula([
            'imagen' => $request->input('imagen'),
            'nombre' => $request->input('nombre'),
            'genero' => $request->input('genero'),
            'descripcion' => $request->input('descripcion'),
            'estreno' => $request->input('estreno'),
            'colores' => $request->input('colores'),
        ]);

        if ($peliculas->save()) {

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

        $peliculas = Pelicula::find($id);
        return response()->json($peliculas);
    }

        /* ------ Actualizar ------ */

    public function update(Request $request, $id)
    {
        /* $rules = ['nombre' => 'required|string|min:1|max:50'];
        $validator = \Validator::make($request->input(),$rules);
        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ],400);
        }
        $pelicula->update($request->input());
        return response()->json([
            'status' => false,
            'message' => 'Pelicula actualizada correctamente'
        ],200); */

        $peliculas = Pelicula::find($id);
        $peliculas->update($request->all());
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

        $peliculas = Pelicula::find($id);
        $peliculas->delete();
        return response()->json('pelicula eliminada!');
    }
    
   /*  public function all(Pelicula $pelicula)
    {
        $peliculas = Pelicula::select('peliculas.*')->get();
        return response()->json($peliculas);
    } */
}
