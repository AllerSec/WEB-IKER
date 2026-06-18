import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = {
  title: "Política de Cookies · VirtuoSolve",
  description:
    "Información sobre el uso de cookies en VirtuoSolve, conforme a la Ley 34/2002 y la Guía de la AEPD.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      updated="12 de junio de 2026"
    >
      <p>
        Esta Política de Cookies se redacta conforme al artículo 22.2 de la
        Ley 34/2002, de Servicios de la Sociedad de la Información y de
        Comercio Electrónico (LSSI-CE), y a la Guía sobre el uso de las
        cookies publicada por la Agencia Española de Protección de Datos
        (AEPD).
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web envía al
        navegador del usuario y que se almacenan en su dispositivo. Permiten
        recordar información sobre la visita (por ejemplo, el idioma
        preferido o la sesión iniciada), reconocer al usuario en visitas
        posteriores y, en algunos casos, obtener información estadística o
        publicitaria.
      </p>

      <h2>2. Tipos de cookies utilizadas</h2>
      <p>
        A continuación se detallan los tipos de cookies que pueden
        utilizarse en este sitio web. <em>El listado concreto de cookies
        deberá ajustarse cuando se integren herramientas reales (analítica,
        píxeles, mapas, fuentes externas, etc.)</em>:
      </p>
      <ul>
        <li>
          <strong>Cookies técnicas o estrictamente necesarias.</strong>{" "}
          Permiten al usuario navegar por el sitio y utilizar sus funciones
          básicas (por ejemplo, recordar la aceptación de este aviso). No
          requieren consentimiento.
        </li>
        <li>
          <strong>Cookies de preferencias.</strong> Permiten recordar
          decisiones del usuario, como el idioma o la región.
        </li>
        <li>
          <strong>Cookies analíticas.</strong> Permiten cuantificar el
          número de usuarios y analizar de forma agregada cómo utilizan el
          sitio, con el fin de mejorar el servicio. Solo se instalan si el
          usuario las acepta.
        </li>
        <li>
          <strong>Cookies de marketing o publicitarias.</strong> Permiten
          gestionar la publicidad en función de los hábitos de navegación
          del usuario. Solo se instalan si el usuario las acepta. En la
          actualidad este sitio <em>[NO]</em> utiliza cookies de este tipo
          — actualizar cuando se integren.
        </li>
      </ul>

      <h2>3. Gestión de cookies</h2>
      <p>
        Al acceder al sitio se muestra un aviso con la información esencial
        sobre cookies, ofreciendo al usuario la posibilidad de:
      </p>
      <ul>
        <li>
          <strong>Aceptar todas</strong> las cookies utilizadas en el sitio.
        </li>
        <li>
          <strong>Aceptar solo las necesarias</strong>, rechazando las
          cookies analíticas, de preferencias y de marketing.
        </li>
        <li>
          <strong>Configurar</strong> el consentimiento por categorías
          (cuando se integre un panel de preferencias).
        </li>
      </ul>
      <p>
        El usuario puede retirar su consentimiento en cualquier momento
        eliminando las cookies almacenadas desde la configuración de su
        navegador y volviendo a visitar el sitio. A continuación se indican
        los enlaces a las instrucciones de los navegadores más comunes:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/es-es/microsoft-edge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>4. Transferencias internacionales</h2>
      <p>
        Algunas cookies de terceros pueden implicar la transferencia de
        datos fuera del Espacio Económico Europeo. En esos casos, los
        proveedores correspondientes aplican las garantías previstas en el
        Capítulo V del RGPD (decisiones de adecuación, Cláusulas
        Contractuales Tipo, etc.).
      </p>

      <h2>5. Cambios en la política</h2>
      <p>
        Esta Política de Cookies puede ser modificada para adaptarla a
        cambios legislativos o a la incorporación de nuevas herramientas en
        el sitio web. Recomendamos revisarla periódicamente. La fecha de
        última actualización figura al inicio del documento.
      </p>

      <p className="text-[12px] text-ink-soft/60 italic mt-10">
        Esta política se completará con el listado detallado de cookies
        cuando se integren herramientas concretas (por ejemplo, Google
        Analytics, Meta Pixel, Google Maps, fuentes externas, embeds de
        video, etc.). Mientras tanto, el sitio utiliza únicamente cookies
        técnicas necesarias para recordar la propia aceptación del aviso.
      </p>
    </LegalLayout>
  );
}
