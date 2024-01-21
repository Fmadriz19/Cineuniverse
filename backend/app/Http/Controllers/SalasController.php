<?php

namespace App\Http\Controllers;
use App\Models\Sala;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class SalasController extends Controller
{
        /* ------ Mostrar todo ------ */

    public function index()
    {
        $salas = Sala::all();
        return response()->json($salas);
    }

        /* ------ Crear ------ */

    public function store(Request $request)
    {

        /* $validator = Validator::make($request->all(), [
            'nombre' => 'required|min:3',
            'correo' => 'required|min:11',
            'usuario' => 'required',
            'contraseña' => 'required|min:6'
        ]); 

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }*/

        $salas = new Sala([
            'nombre' => $request->input('nombre'),
            'asiento' => $request->input('asiento'),
            'inicio' => $request->input('inicio'),
            'final' => $request->input('final'),
            'tipo' => $request->input('tipo'),
        ]);

        if ($salas->save()) {

            return response()->json([
                'message'=> 'Sala creada',
            ], 201);

        } else {
            return response()->json([
                'message'=> 'Error al crear la sala',
            ], 400);
        }

    }

        /* ------ Actualizar ------ */

    public function update(Request $request, $id)
    {
        $salas = Sala::find($id);
        $salas->update($request->all());
        return response()->json('Datos de la sala actualizados!');
    }

        /* ------ Buscar Sala ------ */

    public function show($id)
    {
        $salas = Sala::find($id);
        return response()->json($salas);
    }

        /* ------ Eliminar ------ */

    public function destroy($id)
    {
        $salas = Sala::find($id);
        $salas->delete();
        return response()->json('Sala eliminada!');
    }
}
