

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  dni: String,
  nombres: String,
  apellidos: String,
  direccion: String,
  telefono: String,
});

const UserModel = mongoose.model('clientes', userSchema);

app.use(bodyParser.json());

////////////////////////////////////REGISTRAR CLIENTE////////////////////////////////////////////

app.post('/registrar-cliente', async (req, res) => {
  try {
    const requiredFields = ['dni', 'nombres', 'apellidos', 'direccion', 'telefono'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ mensaje: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
    }

    const nuevoCliente = new UserModel(req.body);
    await nuevoCliente.save();

    res.json({ mensaje: 'Los valores fueron registrados con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error de ingreso' });
  }
});
////////////////////////////MOSTRAR CLIENTES////////////////////////////
  app.get('/mostrar-clientes', async (req, res) => {
    try {
      // Obtener todos los pedidos
      const todosLosPedidos = await UserModel.find();
  
      res.json(todosLosPedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar obtener la información de todos los pedidos' });
    }
  });

/////////////////////////////////eliminar cliente//////////////////////////////
app.delete('/eliminar-cliente', async (req, res) => {
    try {
      const dniCliente = req.body.dni;

    // Validar el formato del DNI (8 dígitos)
    if (!dniCliente || !/^\d{8}$/.test(dniCliente)) {
    return res.status(400).json({ mensaje: 'El formato del DNI es incorrecto o no se proporcionó.' });
    }
      // Verificar si el cliente existe antes de intentar eliminarlo
      const clienteExistente = await UserModel.findOne({ dni: dniCliente });
      if (!clienteExistente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
  
      // Eliminar el cliente
      await UserModel.deleteOne({ dni: dniCliente });
  
      res.json({ mensaje: 'Cliente eliminado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar eliminar el cliente' });
    }
  });

  ///////////////////////Nuevo endpoint para actualizar datos de un cliente//////////////////////////////////////////
app.put('/actualizar-cliente/:dni', async (req, res) => {
    try {
      const dniCliente = req.params.dni;
      const actualizacionDatos = req.body;
  
      // Validar el formato del DNI (8 dígitos)
      if (!dniCliente || !/^\d{8}$/.test(dniCliente)) {
        return res.status(400).json({ mensaje: 'El formato del DNI es incorrecto o no se proporcionó.' });
      }
  
      // Verificar si el cliente existe antes de intentar actualizar sus datos
      const clienteExistente = await UserModel.findOne({ dni: dniCliente });
      if (!clienteExistente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      }
  
      // Actualizar los datos del cliente
      await UserModel.updateOne({ dni: dniCliente }, actualizacionDatos);
  
      res.json({ mensaje: 'Datos del cliente actualizados con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar actualizar datos del cliente' });
    }
  });
    /////////////////////////////////////////////////REGISTRAR MASCOTAS///////////////////////////////

    const mascotaSchema = new mongoose.Schema({
        nombre: String,
        especie: String,
        raza: String,
        fecha_nac: Date,
      });
      
      const MascotaModel = mongoose.model('Mascotas', mascotaSchema);
      
      // ...
      
      // Nuevo endpoint para registrar mascotas
      app.post('/registrar-mascota', async (req, res) => {
        try {
          const requiredFields = ['nombre', 'especie', 'raza', 'fecha_nac'];
          const missingFields = requiredFields.filter(field => !req.body[field]);
      
          if (missingFields.length > 0) {
            return res.status(400).json({ mensaje: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
          }
      
          const nuevaMascota = new MascotaModel(req.body);
          await nuevaMascota.save();
      
          res.json({ mensaje: 'Los valores fueron registrados con éxito' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ mensaje: 'Error de ingreso' });
        }
      });
////////////////////////MOSTRAR MASCOTAS///////////////////////////////////////
  app.get('/mostrar-mascotas', async (req, res) => {
    try {
      // Obtener todos los pedidos
      const todosLosPedidos = await MascotaModel.find();
  
      res.json(todosLosPedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar obtener la información de todos los pedidos' });
    }
  });

///////////////////////////////ELIMINAR MASCOTA///////////////////////////////////

// Nuevo endpoint para eliminar mascota por nombre
    app.delete('/eliminar-mascota', async (req, res) => {
    try {
      const nombreMascota = req.body.nombre;
  
      // Validar que se haya proporcionado el nombre de la mascota en el cuerpo
      if (!nombreMascota) {
        return res.status(400).json({ mensaje: 'El nombre de la mascota es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si la mascota existe antes de intentar eliminarla
      const mascotaExistente = await MascotaModel.findOne({ nombre: nombreMascota });
      if (!mascotaExistente) {
        return res.status(404).json({ mensaje: 'Mascota no encontrada' });
      }
  
      // Eliminar la mascota
      await MascotaModel.deleteOne({ nombre: nombreMascota });
  
      res.json({ mensaje: 'Mascota eliminada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar eliminar la mascota' });
    }
  });
  
  /////////////////////////ACTUALIZAR MASCOTA/////////////////////////////
 
// Nuevo endpoint para actualizar información de mascota por nombre
app.put('/actualizar-mascota', async (req, res) => {
    try {
      const nombreMascota = req.body.nombre;
  
      // Validar que se haya proporcionado el nombre de la mascota en el cuerpo
      if (!nombreMascota) {
        return res.status(400).json({ mensaje: 'El nombre de la mascota es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si la mascota existe antes de intentar actualizarla
      const mascotaExistente = await MascotaModel.findOne({ nombre: nombreMascota });
      if (!mascotaExistente) {
        return res.status(404).json({ mensaje: 'Mascota no encontrada' });
      }
  
      // Actualizar la información de la mascota
      await MascotaModel.updateOne({ nombre: nombreMascota }, req.body);
  
      res.json({ mensaje: 'Información de la mascota actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar actualizar la información de la mascota' });
    }
  });
  ////////////////////////////INGRESAR PRODUCTOS///////////////////////////////////////
// ...

const productoSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    descripcion: String,
    precio: Number,
    cantidad_stock: Number,
  });
  
  const ProductoModel = mongoose.model('Productos', productoSchema);
  
  // Nuevo endpoint para registrar productos
  app.post('/registrar-producto', async (req, res) => {
    try {
      const requiredFields = ['codigo', 'nombre', 'descripcion', 'precio', 'cantidad_stock'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
  
      if (missingFields.length > 0) {
        return res.status(400).json({ mensaje: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
      }
  
      const nuevoProducto = new ProductoModel(req.body);
      await nuevoProducto.save();
  
      res.json({ mensaje: 'Los valores fueron registrados con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error de ingreso' });
    }
  });

  ////////////////////////////MOSTRAR PRODUCTOS/////////////////////////////////
  app.get('/mostrar-productos', async (req, res) => {
    try {
      // Obtener todos los pedidos
      const todosLosPedidos = await ProductoModel.find();
  
      res.json(todosLosPedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar obtener la información de todos los pedidos' });
    }
  });
  ///////////////////ELIMINAR PRODUCTO///////////////////////////////////////////

// Nuevo endpoint para eliminar producto por código
app.delete('/eliminar-producto', async (req, res) => {
    try {
      const codigoProducto = req.body.codigo;
  
      // Validar que se haya proporcionado el código del producto en el cuerpo
      if (!codigoProducto) {
        return res.status(400).json({ mensaje: 'El código del producto es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si el producto existe antes de intentar eliminarlo
      const productoExistente = await ProductoModel.findOne({ codigo: codigoProducto });
      if (!productoExistente) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
  
      // Eliminar el producto
      await ProductoModel.deleteOne({ codigo: codigoProducto });
  
      res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar eliminar el producto' });
    }
  });
/////////////////////////ACTUALIZAR PRODUCTO CON EL CODIGO///////////////////////////////

// Nuevo endpoint para actualizar información de producto por código
app.put('/actualizar-producto', async (req, res) => {
    try {
      const codigoProducto = req.body.codigo;
  
      // Validar que se haya proporcionado el código del producto en el cuerpo
      if (!codigoProducto) {
        return res.status(400).json({ mensaje: 'El código del producto es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si el producto existe antes de intentar actualizarlo
      const productoExistente = await ProductoModel.findOne({ codigo: codigoProducto });
      if (!productoExistente) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
  
      // Actualizar la información del producto
      await ProductoModel.updateOne({ codigo: codigoProducto }, req.body);
  
      res.json({ mensaje: 'Información del producto actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar actualizar la información del producto' });
    }
  });
  ///////////////////////////////REGISTRAR CATEGORIAS DE PRODUCTOS/////////////////////////////////////

  // ...

const categoriaSchema = new mongoose.Schema({
    id_categoria: String,
    nombre_categoria: String,
  });
  
  const CategoriaModel = mongoose.model('Categorias', categoriaSchema);
  
  // ...
  
  // Nuevo endpoint para registrar categorías
  app.post('/registrar-categoria', async (req, res) => {
    try {
      const requiredFields = ['id_categoria', 'nombre_categoria'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
  
      if (missingFields.length > 0) {
        return res.status(400).json({ mensaje: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
      }
  
      const nuevaCategoria = new CategoriaModel(req.body);
      await nuevaCategoria.save();
  
      res.json({ mensaje: 'Los valores fueron registrados con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error de ingreso' });
    }
  });
//////////////////////////////MOSTRAR TODA LA COLECCION DE CATEGORIA/////////////////////
app.get('/mostrar-categorias', async (req, res) => {
    try {
      // Obtener todos los pedidos
      const todosLosPedidos = await CategoriaModel.find();
  
      res.json(todosLosPedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar obtener la información de todos los pedidos' });
    }
  });

  /////////////////////////////////ELIMINAR CATEGORIA/////////////////////////////////////
  
// Nuevo endpoint para eliminar categoría por id_categoria
app.delete('/eliminar-categoria', async (req, res) => {
    try {
      const idCategoria = req.body.id_categoria;
  
      // Validar que se haya proporcionado el id_categoria en el cuerpo
      if (!idCategoria) {
        return res.status(400).json({ mensaje: 'El id_categoria es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si la categoría existe antes de intentar eliminarla
      const categoriaExistente = await CategoriaModel.findOne({ id_categoria: idCategoria });
      if (!categoriaExistente) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      // Eliminar la categoría
      await CategoriaModel.deleteOne({ id_categoria: idCategoria });
  
      res.json({ mensaje: 'Categoría eliminada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar eliminar la categoría' });
    }
  });
////////////////////////////////////////ACTUALIZAR CATEGORIA///////////////////////////////////

// Nuevo endpoint para actualizar información de categoría por id_categoria
app.put('/actualizar-categoria', async (req, res) => {
    try {
      const idCategoria = req.body.id_categoria;
  
      // Validar que se haya proporcionado el id_categoria en el cuerpo
      if (!idCategoria) {
        return res.status(400).json({ mensaje: 'El id_categoria es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si la categoría existe antes de intentar actualizarla
      const categoriaExistente = await CategoriaModel.findOne({ id_categoria: idCategoria });
      if (!categoriaExistente) {
        return res.status(404).json({ mensaje: 'Categoría no encontrada' });
      }
  
      // Actualizar la información de la categoría
      await CategoriaModel.updateOne({ id_categoria: idCategoria }, req.body);
  
      res.json({ mensaje: 'Información de la categoría actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar actualizar la información de la categoría' });
    }
  });  
   /////////////////////////////REGISTRAR PEDIDOS/////////////////////////////////////////////


const pedidoSchema = new mongoose.Schema({
    id_pedido: String,
    fecha_pedido: Date,
    estado_pedido: String,
  });
  
  const PedidoModel = mongoose.model('Pedido', pedidoSchema);
  
  // ...
  
  // Nuevo endpoint para registrar pedidos
  app.post('/registrar-pedido', async (req, res) => {
    try {
      const requiredFields = ['id_pedido', 'fecha_pedido', 'estado_pedido'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
  
      if (missingFields.length > 0) {
        return res.status(400).json({ mensaje: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
      }
  
      const nuevoPedido = new PedidoModel(req.body);
      await nuevoPedido.save();
  
      res.json({ mensaje: 'Los valores fueron registrados con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error de ingreso' });
    }
  });

  //////////////////////ELIMINAR PEDIDO/////////////////////////////////////////////////////
 
// Nuevo endpoint para eliminar pedido por id_pedido
app.delete('/eliminar-pedido', async (req, res) => {
    try {
      const idPedido = req.body.id_pedido;
  
      // Validar que se haya proporcionado el id_pedido en el cuerpo
      if (!idPedido) {
        return res.status(400).json({ mensaje: 'El id_pedido es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si el pedido existe antes de intentar eliminarlo
      const pedidoExistente = await PedidoModel.findOne({ id_pedido: idPedido });
      if (!pedidoExistente) {
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }
  
      // Eliminar el pedido
      await PedidoModel.deleteOne({ id_pedido: idPedido });
  
      res.json({ mensaje: 'Pedido eliminado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar eliminar el pedido' });
    }
  });
  
  ////////////////////////////////////////MOSTRAR TODOS LOS PEDIDOS/////////////////////

// Nuevo endpoint para mostrar todos los pedidos en formato JSON
  app.get('/mostrar-pedidos', async (req, res) => {
    try {
      // Obtener todos los pedidos
      const todosLosPedidos = await PedidoModel.find();
  
      res.json(todosLosPedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar obtener la información de todos los pedidos' });
    }
  });
  //////////////////////////////////////////////ACTUALIZAR PEDIDOS///////////////////////////////////
 
// Nuevo endpoint para actualizar información de pedido por id_pedido
app.put('/actualizar-pedido', async (req, res) => {
    try {
      const idPedido = req.body.id_pedido;
  
      // Validar que se haya proporcionado el id_pedido en el cuerpo
      if (!idPedido) {
        return res.status(400).json({ mensaje: 'El id_pedido es obligatorio en el cuerpo de la solicitud.' });
      }
  
      // Verificar si el pedido existe antes de intentar actualizarlo
      const pedidoExistente = await PedidoModel.findOne({ id_pedido: idPedido });
      if (!pedidoExistente) {
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }
  
      // Actualizar la información del pedido
      await PedidoModel.updateOne({ id_pedido: idPedido }, req.body);
  
      res.json({ mensaje: 'Información del pedido actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al intentar actualizar la información del pedido' });
    }
  });


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
