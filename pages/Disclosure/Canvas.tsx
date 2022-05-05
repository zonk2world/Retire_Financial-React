import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

interface ComponentProps {
    className:string;
    font:string;
    width:number|undefined;
    height:number;
    fontSize:number;
    name:string;
    convetToImage:(dataUrl:string)=>void;
    setSelectedSignature:()=>void;
    convert:boolean;

}



const Canvas:React.FC<ComponentProps> =({className, font, width, height, fontSize, name,convetToImage, setSelectedSignature, convert})=> {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [myInterval, setMyInterval] = useState<NodeJS.Timer>();
    useEffect(()=>{
        const canvas = canvasRef.current
        if(!canvas || !width)
            return;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')
        if(!ctx)
            return;
        if(myInterval)
            clearInterval(myInterval);
        
        setMyInterval( setInterval(drawTime, 1000));

        function drawTime(){     
            if(!canvas || !width || !ctx || width ===0)
                return;               
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.strokeStyle = "#173A78"
            ctx.lineWidth = 2;
            //drawing outer rounded rect
            ctx.beginPath();
            ctx.moveTo(11, 3);
            ctx.lineTo(width-11, 3);
            ctx.quadraticCurveTo(width-3, 3, width-3,11);
            ctx.lineTo(width-3, height-11);
            ctx.quadraticCurveTo(width-3, height-3, width-11, height-3);
            ctx.lineTo(11, height-3);
            ctx.quadraticCurveTo(3, height-3, 3, height-11);
            ctx.lineTo(3, 11);
            ctx.quadraticCurveTo(3, 3, 11, 3);
            ctx.stroke();

            //drawing inner rouded half rect
            ctx.beginPath();
            ctx.moveTo(width*0.2, 15);
            ctx.lineTo(31, 15);
            ctx.quadraticCurveTo(15, 15, 15, 31);
            ctx.lineTo(15, height-31);
            ctx.quadraticCurveTo(15, height-15, 31, height-15);
            ctx.lineTo(width*0.2, height-15);
            ctx.stroke();

            //drawing text
            ctx.textAlign = 'left';
            ctx.textBaseline = "middle";
            ctx.fillStyle = 'black';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('Esigned By', width*0.2+5, 16);

            let time = moment().format("MMM DD YYYY H:mm:ss")
            ctx.fillText(time, width*0.2+5, height-15);
            
            ctx.font = 'bold ' +fontSize+"px" + font;
            ctx.textAlign = 'center';
            
            let testWidth = ctx.measureText(name).width;
            while(testWidth>canvas.width-40){
                ctx.font = 'bold ' +(fontSize-3)+"px" + font;
                fontSize-=3;
                console.log("font->",'bold ' +fontSize+"px " + font);
                testWidth = ctx.measureText(name).width;
            }
           
            ctx.fillText(name,canvas.width / 2, height/2);

        }
            
    },[width,name]);

    useEffect(()=>{
        if(convert){
            let dataUrl = canvasRef.current?.toDataURL();
            if(dataUrl)
                convetToImage(dataUrl);
        }
    },[convert])

    return(
        <canvas className={className} ref={canvasRef} onClick={setSelectedSignature}/>
    )
}

export default Canvas;