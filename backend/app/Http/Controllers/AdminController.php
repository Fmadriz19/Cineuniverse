<?php

namespace App\Http\Controllers;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AdminController extends Controller
{

        /* ------ Mostrar todo ------ */

    public function index()
    {
        $clientes = Admin::all();
        return response()->json($clientes);
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
        } */

        $clientes = new Admin([
            'nombre' => $request->input('nombre'),
            'apellido' => $request->input('apellido'),
            'cedula' => $request->input('cedula'),
            'imagen' => $request->input('imagen'),
            'correo' => $request->input('correo'),
            'direccion' => $request->input('direccion'),
            'pais' => $request->input('pais'),
            'estado' => $request->input('estado'),
            'ciudad' => $request->input('ciudad'),
            'telefono' => $request->input('telefono'),
            'usuario' => $request->input('usuario'),
            'contraseña' => $request->input('contraseña'),
            'tipoUser' => $request->input('tipoUser'),// si el tipo es 0 (es usuario) y si es 1 (es administrador)
        ]);

        if (empty($request->nombre)) {
            return response()->json([
                'message'=> 'El nombre no puede estar vacio',
            ], 400);
        }

        if (empty($request->correo)) {
            return response()->json([
                'message'=> 'El correo no puede estar vacio',
            ], 400);
        }

        if (empty($request->usuario)) {
            return response()->json([
                'message'=> 'El usuario no puede estar vacio',
            ], 400);
        }

        if (empty($request->contraseña)) {
            return response()->json([
                'message'=> 'La contrasena no puede estar vacio',
            ], 400);
        }

        if (strpos($request->correo, '@gmail.com') === false) {
            return response()->json([
                'message'=> 'El correo debe ser de Gmail',
            ], 400);
        }

        if(Admin::where('correo', $request->correo)->first()){
            return response()->json([
                'message'=> 'El correo ya esta registrado',
            ], 400);
        }

        if(Admin::where('usuario', $request->usuario)->first()){
            return response()->json([
                'message'=> 'El usuario ya esta registrado',
            ], 400);
        }

        if ($clientes->save()) {

            return response()->json([
                'message'=> 'Cliente creado',
            ], 201);

        } else {
            return response()->json([
                'message'=> 'Error al crear el usuario',
            ], 400);
        }

    }

        /* ------ Actualizar ------ */

    public function update(Request $request, $id)
    {
        $clientes = Admin::find($id);

        /* if (empty($request->correo)) {
            return response()->json([
                'message'=> 'El correo no puede estar vacio',
            ], 400);
        }

        if (strpos($request->correo, '@gmail.com') === false) {
            return response()->json([
                'message'=> 'El correo debe ser de Gmail',
            ], 400);
        } */

        // Verificar si el correo ya está registrado para otro usuario
        $existingAdmin = Admin::where('correo', $request->correo)->where('id', '!=', $id)->first();
        if($existingAdmin){
            return response()->json([
                'message'=> 'El correo ya está registrado',
            ], 400);
        }
        // Verificar si el usuario ya está registrado para otro usuario
        $existingAdmin = Admin::where('usuario', $request->usuario)->where('id', '!=', $id)->first();
        if($existingAdmin){
            return response()->json([
                'message'=> 'El usuario ya esta registrado',
            ], 400);
        }

        $clientes->update($request->all());
        return response()->json('Datos de cliente actualizados!');
    }


        /* ------ Buscar Usuario ------ */

    public function show($id)
    {
        $contact = Admin::find($id);
        return response()->json($contact);
    }


        /* ------ Eliminar ------ */

    public function destroy($id)
    {
        $clientes = Admin::find($id);
        $clientes->delete();
        return response()->json('Cliente eliminado!');
    }


        /* ------ Iniciar Sesion ------ */

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        
        if (empty($email)){
            return response()->json([
              'message' => 'El correo no puede estar vacio',
            ], 400);
          } else if(strpos($email, '@gmail.com') === false) {
            return response()->json([
                'message'=> 'El correo debe ser de Gmail',
            ], 400);
          } else if (empty($password)){
            return response()->json([
              'message' => 'La contrasena no puede estar vacía',
            ], 400);
          } else if (strlen($password) < 6){
            return response()->json([
              'message' => 'La contrasena debe tener al menos 6 caracteres',
            ], 400);
          }

        // Search the database for a matching record
        $admin = Admin::where('correo', $email)
                     ->where('contraseña', $password)
                     ->first();

        if ($admin) {
            // Extract the required information
            $id = $admin->id;
            $tipoUser = $admin->tipoUser;

            // Return the extracted information
            return response()->json([
                'id' => $id,
                'tipoUser' => $tipoUser
            ], 200);
        } else {
            // Handle the case when no matching record is found
            return response()->json(['message' => 'El correo y la contrasena no coinciden'], 401);
        }
    }

}