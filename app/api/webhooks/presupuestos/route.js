// app/api/webhooks/presupuestos/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { event, entry } = await request.json();

  // Validar la autorización si es necesario
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Basic 23456sdfasd23234234') { // Reemplaza esto con tu valor real si estás usando autenticación
    return NextResponse.json({ message: 'No autorizado' }, { status: 403 });
  }

  // Verifica el evento
  if (['entry.create', 'entry.update', 'entry.delete'].includes(event)) {
    // Emitir un evento a través de WebSocket
    if (global.io) {
      global.io.emit('UPDATE_PROJECT', entry);
    }

    // Responder a Strapi que el evento fue procesado correctamente
    return NextResponse.json({ message: 'Evento recibido y procesado' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Evento no soportado' }, { status: 400 });
  }
}
