
const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const preguntas = [
      { letra: 'A', pista: 'Con la A: Bienes y derechos que posee una empresa...', solucion: 'activo', estado: 'pendiente' },
      { letra: 'B', pista: 'Con la B: Documento contable que muestra la situación...', solucion: 'balance', estado: 'pendiente' },
      { letra: 'C', pista: 'Con la C: Sistema de registro y control...', solucion: 'contabilidad', estado: 'pendiente' },
      { letra: 'D', pista: 'Con la D: Operación donde el cliente retorna un producto...', solucion: 'devolución', estado: 'pendiente' },
      { letra: 'E', pista: 'Con la E: Documentos contables como balance y cuenta de resultados.', solucion: 'estados financieros', estado: 'pendiente' },
      { letra: 'F', pista: 'Con la F: Documento que acredita una compraventa...', solucion: 'factura', estado: 'pendiente' },
      { letra: 'G', pista: 'Con la G: Salida de dinero de la empresa...', solucion: 'gasto', estado: 'pendiente' },
      { letra: 'H', pista: 'Con la H: Columna de salida del asiento contable...', solucion: 'haber', estado: 'pendiente' },
      { letra: 'I', pista: 'Con la I: Entradas de dinero por ventas...', solucion: 'ingreso', estado: 'pendiente' },
      { letra: 'J', pista: 'Con la J: Documento que justifica una operación.', solucion: 'justificante', estado: 'pendiente' },
      { letra: 'K', pista: 'Con la K: Distancia medida para calcular gastos de transporte.', solucion: 'kilometraje', estado: 'pendiente' },
      { letra: 'L', pista: 'Con la L: Libros que la empresa debe llevar obligatoriamente.', solucion: 'libros contables obligatorios', estado: 'pendiente' },
      { letra: 'M', pista: 'Con la M: Documento explicativo complementario a los estados financieros.', solucion: 'memoria', estado: 'pendiente' },
      { letra: 'N', pista: 'Con la N: Parte del activo que se convierte en dinero en menos de un año.', solucion: 'activo corriente', estado: 'pendiente' },
      { letra: 'Ñ', pista: 'Sin la Ñ: Sin la ñ. Ayuda pública registrada como ingreso.', solucion: 'subvención', estado: 'pendiente' },
      { letra: 'O', pista: 'Con la O: Deuda u obligación de pago.', solucion: 'obligación', estado: 'pendiente' },
      { letra: 'P', pista: 'Con la P: Conjunto de deudas de una empresa.', solucion: 'pasivo', estado: 'pendiente' },
      { letra: 'Q', pista: 'No contiene la Q: Conjunto de normas contables oficiales en España.', solucion: 'Plan General Contable', estado: 'pendiente' },
      { letra: 'R', pista: 'Con la R: Resultado final entre ingresos y gastos.', solucion: 'resultado', estado: 'pendiente' },
      { letra: 'S', pista: 'Con la S: Anotación contable que refleja una operación.', solucion: 'asiento', estado: 'pendiente' },
      { letra: 'T', pista: 'Con la T: Movimiento de dinero para liquidar una operación.', solucion: 'transacción', estado: 'pendiente' },
      { letra: 'U', pista: 'Con la U: Beneficio empresarial. Sinónimo de ganancia.', solucion: 'utilidad', estado: 'pendiente' },
      { letra: 'V', pista: 'Con la V: Impuesto indirecto aplicado al consumo.', solucion: 'IVA', estado: 'pendiente' },
      { letra: 'W', pista: 'Con la W: Entorno digital donde se alojan apps contables.', solucion: 'web', estado: 'pendiente' },
      { letra: 'X', pista: 'No contiene la X: Proceso de cierre del ejercicio contable.', solucion: 'cierre', estado: 'pendiente' },
      { letra: 'Y', pista: 'Con la Y: Rentabilidad de una inversión en inglés.', solucion: 'yield', estado: 'pendiente' },
      { letra: 'Z', pista: 'No contiene la Z: Comparación entre bancos y contabilidad.', solucion: 'conciliación', estado: 'pendiente' }
];

let indice = 0;
let tiempo = 600;
let temporizador;

function crearRosco() {
  const rosco = document.getElementById('rosco');
  rosco.innerHTML = '';
  const radio = 200;
  const centro = 230;
  letras.forEach((letra, i) => {
    const angulo = (2 * Math.PI / letras.length) * i - Math.PI / 2;
    const x = centro + radio * Math.cos(angulo);
    const y = centro + radio * Math.sin(angulo);
    const div = document.createElement('div');
    div.className = 'letra';
    div.id = `letra-${i}`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.innerText = letra;
    rosco.appendChild(div);
  });
}

function mostrarPista() {
  const pregunta = preguntas[indice];
  document.getElementById('pista').innerText = pregunta.pista;
}

function comprobar() {
  const resp = document.getElementById('respuesta').value.toLowerCase().trim();
  const pregunta = preguntas[indice];
  const letraDiv = document.getElementById(`letra-${indice}`);
  if (resp === pregunta.solucion.toLowerCase()) {
    letraDiv.classList.add('verde');
    pregunta.estado = 'correcta';
  } else {
    letraDiv.classList.add('rojo');
    pregunta.estado = 'incorrecta';
    document.getElementById('pista').innerText += ` → Solución: ${pregunta.solucion}`;
  }
  avanzar();
}

function pasarPalabra() {
  avanzar();
}

function avanzar() {
  do {
    indice = (indice + 1) % preguntas.length;
  } while (preguntas[indice].estado !== 'pendiente');
  mostrarPista();
  document.getElementById('respuesta').value = '';
}

function jugar() {
  preguntas.forEach(p => p.estado = 'pendiente');
  indice = 0;
  crearRosco();
  mostrarPista();
  iniciarTemporizador();
}

function iniciarTemporizador() {
  clearInterval(temporizador);
  temporizador = setInterval(() => {
    tiempo--;
    const minutos = String(Math.floor(tiempo / 60)).padStart(2, '0');
    const segundos = String(tiempo % 60).padStart(2, '0');
    document.getElementById('temporizador').innerText = `${minutos}:${segundos}`;
    if (tiempo <= 0) {
      clearInterval(temporizador);
      document.getElementById('pista').innerText = '¡Tiempo agotado!';
    }
  }, 1000);
}

crearRosco();
