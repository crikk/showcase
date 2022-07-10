const jsonServer  = require( 'json-server' );
const server      = jsonServer.create();
const router      = jsonServer.router( './server/db.json' );
const middlewares = jsonServer.defaults();
const port        = 4200;

router.render = (req, res) => {
  let headersToExpose       = [ 'X-Authorization' ];
  let currentExposedHeaders = res.getHeader( 'Access-Control-Expose-Headers' );

  if ( currentExposedHeaders ) {
    res.header( 'Access-Control-Expose-Headers', headersToExpose.concat( currentExposedHeaders.split(',') ).join( ',' ) )
  } else {
    res.header( 'Access-Control-Expose-Headers', headersToExpose.join( ',' ) );
  }

  res.send(res.locals.data)
}

//default json-server middlewares
server.use( middlewares );

server.use( ( req, res, next ) => {
  const sign = require('jwt-encode');
  const secret = 'secret';
  
  const data = {
    iat: Date.now(),
    exp: Date.now() + (10 * 60 * 1000)
  };
  const jwt = sign(data, secret);
  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('X-Authorization', "Bearer: " + jwt);
  next()
});

server.use( router );

server.listen( port, () => {
  console.log( `Server listening on: http://localhost:${port}` );
});