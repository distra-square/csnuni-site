import React, { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  url: string;
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear the container to avoid double rendering
      containerRef.current.innerHTML = '';
      
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'instagram-media';
      blockquote.setAttribute('data-instgrm-captioned', '');
      blockquote.setAttribute('data-instgrm-permalink', url);
      blockquote.setAttribute('data-instgrm-version', '14');
      
      // Inline styles for high compatibility before conversion
      blockquote.style.background = '#FFF';
      blockquote.style.border = '0';
      blockquote.style.borderRadius = '16px';
      blockquote.style.boxShadow = '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)';
      blockquote.style.margin = '1px';
      blockquote.style.width = '100%';
      blockquote.style.maxWidth = '540px';
      blockquote.style.minWidth = '326px';
      blockquote.style.padding = '0';

      const innerDiv = document.createElement('div');
      innerDiv.style.padding = '16px';
      
      const link = document.createElement('a');
      link.href = url;
      link.style.background = '#FFFFFF';
      link.style.lineHeight = '0';
      link.style.padding = '0 0';
      link.style.textAlign = 'center';
      link.style.textDecoration = 'none';
      link.style.width = '100%';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      const flexDiv = document.createElement('div');
      flexDiv.style.display = 'flex';
      flexDiv.style.flexDirection = 'row';
      flexDiv.style.alignItems = 'center';
      
      const circle = document.createElement('div');
      circle.style.backgroundColor = '#F4F4F4';
      circle.style.borderRadius = '50%';
      circle.style.height = '40px';
      circle.style.marginRight = '14px';
      circle.style.width = '40px';
      
      const linesContainer = document.createElement('div');
      linesContainer.style.display = 'flex';
      linesContainer.style.flexDirection = 'column';
      linesContainer.style.flexGrow = '1';
      linesContainer.style.justifyContent = 'center';
      
      const line1 = document.createElement('div');
      line1.style.backgroundColor = '#F4F4F4';
      line1.style.borderRadius = '4px';
      line1.style.height = '14px';
      line1.style.marginBottom = '6px';
      line1.style.width = '100px';
      
      const line2 = document.createElement('div');
      line2.style.backgroundColor = '#F4F4F4';
      line2.style.borderRadius = '4px';
      line2.style.height = '14px';
      line2.style.width = '60px';
      
      linesContainer.appendChild(line1);
      linesContainer.appendChild(line2);
      flexDiv.appendChild(circle);
      flexDiv.appendChild(linesContainer);
      link.appendChild(flexDiv);
      
      const textDiv = document.createElement('div');
      textDiv.style.paddingTop = '20px';
      textDiv.style.color = '#3897f0';
      textDiv.style.fontFamily = 'Arial,sans-serif';
      textDiv.style.fontSize = '14px';
      textDiv.style.fontStyle = 'normal';
      textDiv.style.fontWeight = '550';
      textDiv.style.lineHeight = '18px';
      textDiv.innerText = 'Visualizza questo post su Instagram';
      
      link.appendChild(textDiv);
      innerDiv.appendChild(link);
      blockquote.appendChild(innerDiv);
      containerRef.current.appendChild(blockquote);

      // Function to trigger process
      const processEmbed = () => {
        if ((window as any).instgrm?.Embeds?.process) {
          try {
            (window as any).instgrm.Embeds.process();
          } catch (e) {
            console.error('Error processing Instagram embed:', e);
          }
        }
      };

      // Load Instagram's embed.js if it doesn't exist
      if (!document.getElementById('instagram-embed-script')) {
        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = processEmbed;
      } else {
        // If script is already there, trigger processing after a short timeout to ensure DOM update
        setTimeout(processEmbed, 50);
      }
    }
  }, [url]);

  return (
    <div className="w-full flex flex-col items-center">
      <style dangerouslySetInnerHTML={{__html: `
        .instagram-embed-container .instagram-media,
        .instagram-embed-container iframe {
          min-width: 0 !important;
          width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      `}} />
      <div 
        ref={containerRef} 
        className="instagram-embed-container w-full flex justify-center bg-white rounded-2xl p-1 overflow-y-auto max-h-[520px] scrollbar-thin"
        style={{ minHeight: '460px' }}
      />
    </div>
  );
}
