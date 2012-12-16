/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(countdown/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "CountDown"
 */
qx.Class.define("countdown.Application",
{
	extend : qx.application.Standalone,



	/*
	*****************************************************************************
	 MEMBERS
	*****************************************************************************
	*/

	members :
	{
		/**
		 * This method contains the initial application code and gets called 
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function()
		{
			// Call super class
			this.base(arguments);

			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug"))
			{
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console;
			}

			/*
			-------------------------------------------------------------------------
			Below is your actual application code...
			-------------------------------------------------------------------------
			*/

			var dtFim = new Date(2013,0,4,18,0);
			
			
			var doc = this.getRoot();
			doc.setBackgroundColor("#000000");

			var ly0 = new qx.ui.layout.Grid(0,0);
			var cn0 = new qx.ui.container.Composite(ly0);
			doc.add(cn0,{edge:0});
			
			ly0.setRowFlex(0,1);
			ly0.setRowFlex(2,1);
			ly0.setColumnFlex(0,1);
			ly0.setColumnFlex(2,1);
			ly0.setRowAlign(1,'center','middle');
			
			var MainLy = new qx.ui.layout.Grid(15,0);
			var MainWnd = new qx.ui.container.Composite(MainLy);
			
			
			
			cn0.add(MainWnd,{column:1, row:1});
			cn0.add(new qx.ui.core.Spacer(1),{column:0, row:0});
			cn0.add(new qx.ui.core.Spacer(1),{column:2, row:0});
			cn0.add(new qx.ui.core.Spacer(1),{column:0, row:2});
			cn0.add(new qx.ui.core.Spacer(1),{column:2, row:2});
			
			
			for(var i = 0; i < 4; i++)
			{
				MainLy.setColumnAlign(i+1, "center", "top");
			}
			
			var fntHora = qx.bom.Font.fromString("150px bold Arial");
			var cFlds = [];
			var cLabels = ["Dias","Horas","Minutos","Segundos"];

			for(i = 0; i < 4; i++)
			{
				MainLy.setColumnAlign(i,"center","middle");
				cFlds[i] = new qx.ui.basic.Label("00");
				cFlds[i].set(
				{
					rich:false,
					textAlign:"center"
				});
				
				cFlds[i].setBackgroundColor("#202020");
				cFlds[i].setTextColor("#ff7000");
				cFlds[i].setAlignX("center");
				cFlds[i].setFont(fntHora);

				MainWnd.add(cFlds[i],{row:0,column:i});
				var cLbl = new qx.ui.basic.Label(cLabels[i]);
				cLbl.setTextColor("#ffff00");
				cLbl.setTextAlign("center");
				cLbl.setBackgroundColor("#000520");
				MainWnd.add(cLbl,{row:1,column:i});
			}

			// Constantes auxiliares:
			var MINUTOS =           60;
			var HORAS   = MINUTOS * 60;
			var DIAS    = HORAS   * 24;
			
			// NumberFormat para formatarmos com zeros à esquerda:
			var nf = new qx.util.format.NumberFormat();
			nf.setMinimumIntegerDigits(2);
			
			// Animação:
			var duracao = 200;
			var animation = 
			{
				duration : duracao, 
				timing	 : "ease-out", 
				origin   : "50% 50%",
				keyFrames: 
				{
					  0 : {scale: [1,1], translate : ["0px", "0px"]},
					 50 : {scale: [1,0], translate : ["0px", "0px"]},
					100 : {scale: [1,1], translate : ["0px", "0px"]} 
				}
			};
				  
			// Ligamos o timer
			var tmTimer = new qx.event.Timer(1000);
			tmTimer.addListener("interval",function(e)
			{
				// Calculamos a diferença:
				var dtNow = new Date();
				var nEta = (dtFim.valueOf() - dtNow.valueOf())/1000; // segundos
				var aFlds  = []; // Valor numérico do campo 
				var aFmted = []; // String com o campo formatado
				var aUnits = [DIAS,HORAS,MINUTOS,1];
				var i;
				
				for(i = 0; i < 4; i++)
				{
					aFlds[i] = Math.floor(nEta / aUnits[i]);
					nEta %= aUnits[i];
				}
				
				// Os diferentes deverão ser animados:
				var oAnimate = [];
					
				// Agora tratamos cada campo de acordo com a mudança (se houver)
				for(i = 0; i < 4; i++)
				{
					aFmted[i] = nf.format(aFlds[i]);
					
					
					// Se houver diferença, fazemos a animação:
					if(aFlds[i] != (1*cFlds[i].getValue()))
					{
						qx.bom.element.Animation.animate(cFlds[i].getContentElement().getDomElement(), animation);
						cFlds[i].setValue(aFmted[i]);
					}
					
					
				}
			},this);
			
			tmTimer.start();
			
		} // main
	}
});
