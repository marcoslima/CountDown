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
			
			var MainLy = new qx.ui.layout.Grid(15,0);
			var MainWnd = new qx.ui.container.Composite(MainLy);
			
			
			
			doc.add(MainWnd,{edge:0});
			
			for(var i = 0; i < 4; i++)
			{
				MainLy.setColumnAlign(i+1, "center", "top");
			}
			var fntHora = qx.bom.Font.fromString("150px bold Arial");
			var cFlds = [];
			var cLabels = ["Dias","Horas","Minutos","Segundos"];
			var k;
			for(k = 0; k < 2; k++)
			{
				cFlds[k] = [];
				for(i = 0; i < 4; i++)
				{
					cFlds[k][i] = new qx.ui.basic.Label("00");
					cFlds[k][i].set(
					{
						value: "00",
						rich:false,
						textAlign:"center"
					});
					
					cFlds[k][i].setBackgroundColor("#202020");
					cFlds[k][i].setTextColor("#ffffff");
					cFlds[k][i].setAlignX("center");
					cFlds[k][i].setFont(fntHora);

					if(k == 0)
					{
						MainWnd.add(cFlds[k][i],{row:0,column:i});
						var cLbl = new qx.ui.basic.Label(cLabels[i]);
						cLbl.setTextColor("#ffff00");
						cLbl.setTextAlign("center");
						MainWnd.add(cLbl,{row:1,column:i});
					}
				}
			}

			// Constantes auxiliares:
			var MINUTOS =           60;
			var HORAS   = MINUTOS * 60;
			var DIAS    = HORAS   * 24;
			
			var frame = 0;
			
			// Ligamos o timer
			var tmTimer = new qx.event.Timer(1000);
			tmTimer.addListener("interval",function(e)
			{
				// Calculamos a diferença:
				var dtNow = new Date();
				var nEta = (dtFim.valueOf() - dtNow.valueOf())/1000; // segundos
				
				var Dias  = Math.floor(nEta / DIAS);
				nEta %= DIAS;
				var Horas = Math.floor(nEta / HORAS);
				nEta %= HORAS;
				var Minutos = Math.floor(nEta / MINUTOS);
				var Segundos = Math.floor(nEta) % MINUTOS;
				var nf = new qx.util.format.NumberFormat();
				nf.setMinimumIntegerDigits(2);
				
				cFlds[frame][0].setValue(nf.format(Dias	));
				cFlds[frame][1].setValue(nf.format(Horas	));
				cFlds[frame][2].setValue(nf.format(Minutos	));
				cFlds[frame][3].setValue(nf.format(Segundos));
				
			},this);
			
			tmTimer.start();
			
		} // main
	}
});
