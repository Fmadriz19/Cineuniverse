<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;

class EnvioController extends Controller
{
        /* ------ Mostrar todo ------ */

        public function index()
        {
            $videos = Video::all();
            return response()->json($videos); 
        }
    
            /* ------ Crear ------ */
    
        public function store(Request $request)
        {
    
            $videos = new Video([
                'itemImageSrc' => $request->input('itemImageSrc'),
                'thumbnailVideoSrc' => $request->input('thumbnailVideoSrc'),
                'alt' => $request->input('alt'),
                'title' => $request->input('title'),
            ]);
    
            if ($videos->save()) {
    
                return response()->json([
                    'message'=> 'Video creado',
                ], 201);
    
            } else {
                return response()->json([
                    'message'=> 'Error al crear el Video',
                ], 400);
            }
        }
    
            /* ------ Buscar Video ------ */
    
        public function show($id)
        {
    
            $videos = Pelicula::find($id);
            return response()->json($videos);
        }
    
            /* ------ Actualizar ------ */
    
        public function update(Request $request, $id)
        {
    
            $videos = Video::find($id);
            $videos->update($request->all());
            return response()->json('Datos del Video actualizados!');
        }
    
            /* ------ Eliminar ------ */
    
        public function destroy($id)
        {
    
            $videos = Video::find($id);
            $videos->delete();
            return response()->json('Video eliminado!');
        }
}