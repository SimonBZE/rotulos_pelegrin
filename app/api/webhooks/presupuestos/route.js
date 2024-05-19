// app/api/webhooks/presupuestos/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { event, entry } = await request.json();

  // Validar la autorización si es necesario
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Basic 23456sdfasd23234234') { // Reemplaza esto con tu valor real si estás usando autenticación
    return NextResponse.json({ message: 'No autorizado' }, { status: 403 });
  }

  // Verifica el evento y emite el correspondiente a través de WebSocket
  if (global.io) {
    if (event === 'entry.create') {
      global.io.emit('NEW_PROJECT', entry);
    } else if (event === 'entry.update') {
      global.io.emit('UPDATE_PROJECT', entry);
    } else if (event === 'entry.delete') {
      global.io.emit('DELETE_PROJECT', entry);
    }
  }

  // Responder a Strapi que el evento fue procesado correctamente
  if (['entry.create', 'entry.update', 'entry.delete'].includes(event)) {
    return NextResponse.json({ message: 'Evento recibido y procesado' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Evento no soportado' }, { status: 400 });
  }
}
