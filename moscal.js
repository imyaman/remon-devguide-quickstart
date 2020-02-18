document.writeln("<b>Mean opinion score calculator</b><br>");
document.writeln("Author: Alexander F. Ribadeneira<br>");
document.writeln("Reference: ITU-T G.107, ITU-T G.113, RFC 3550, RFC 3551 ");
    function calculate() {
      /***********************************************************************
      //Default values for the parameters of the E-model according ITU-T
      G.107
      var SLR = 8; //Send Loudness Rating
      var RLR = 2; //Receive Loudness Rating
      var STMR = 15; //Sidetone Masking Rating
      var LSTR = 18; //Listener Sidetone Rating
      var Ds = 3; //D-Value of Telephone, Send Side
      var Dr = 3; //D-Value of Telephone Receive Side
      var TELR = 65; //Talker Echo Loudness Rating
      var WEPL = 110; //Weighted Echo Path Loss
      var T = 0; //Mean one-way Delay of the Echo Path
      var Tr = 0; //Round-trip Delay in a 4-wire Loop
      var Ta = 0; //Absolute Delay in echo-free Connections
      var qdu = 1; //Number of Quantization Distortion Units
      var Ie = 0; //Equipment Impairment Factor
      var Bpl = 1; //Packet-loss Robustness Factor
      var Ppl = 0; //Random Packet-loss Probability
      var Nc = -70; //Circuit Noise referred to 0 dBr-point
      var Nfor = -64; //Noise Floor at the Receive Side
      var Ps = 35; //Room Noise at the Send Side
      var Pr = 35; //Room Noise at the Receive Side
      var A = 0; //Advantage Factor
      **************************************************************************/
      var SLR = parseFloat(document.getElementById("_SLR").value);
      var RLR = parseFloat(document.getElementById("_RLR").value);
      var STMR = parseFloat(document.getElementById("_STMR").value);
      var Ds = parseFloat(document.getElementById("_Ds").value);
      var Dr = parseFloat(document.getElementById("_Dr").value);
      var TELR = parseFloat(document.getElementById("_TELR").value);
      var WEPL = parseFloat(document.getElementById("_WEPL").value);
      var T = parseFloat(document.getElementById("_T").value);
      var Tr = parseFloat(document.getElementById("_Tr").value);
      var Ta = parseFloat(document.getElementById("_Ta").value);
      var qdu = parseFloat(document.getElementById("_qdu").value);
      var Ie = parseFloat(document.getElementById("_Ie").value);
      var Bpl = parseFloat(document.getElementById("_Bpl").value);
      var Ppl = parseFloat(document.getElementById("_Ppl").value);
      var Nc = parseFloat(document.getElementById("_Nc").value);
      var Nfor = parseFloat(document.getElementById("_Nfor").value);
      var Ps = parseFloat(document.getElementById("_Ps").value);
      var Pr = parseFloat(document.getElementById("_Pr").value);
      var A = parseFloat(document.getElementById("_A").value);
      //Calculate LSTR
      var LSTR = STMR + Dr;
      document.getElementById("_LSTR").value = LSTR;
      //Calculate OLR
      var OLR = SLR + RLR;
      //Calculate Nfo
      var Nfo = Nfor + RLR;
      //Calculate Pre
      var Pre = Pr + 10 * log10(1 + Math.pow(10, (10 - LSTR) / 10));
      //Calculate Nor
      var Nor = RLR - 121 + Pre + 0.008 * (Pre - 35) * (Pre - 35);
      //Calculate Nos
      var Nos = Ps - SLR - Ds - 100 + 0.004 * (Ps - OLR - Ds - 14) * (Ps - OLR - Ds - 14);
      //Calculate No
      var No = 10 * log10(Math.pow(10, (Nc / 10)) + Math.pow(10, (Nos / 10)) + Math.pow(10, (Nor / 10)) + Math.pow(10, (Nfo / 10)));
      //Calculate Ro
      var Ro = 15 - 1.5 * (SLR + No);
      document.getElementById("_Ro").value = Math.round(Ro * 10) / 10;
      //Calculate Xolr
      var Xolr = OLR + 0.2 * (64 + No - RLR);
      //Calculate Iolr
      var Iolr = 20 * (Math.pow((1 + Math.pow((Xolr / 8), 8)), 0.125) - Xolr / 8);
      //Calculate STMRo
      var STMRo = -10 * log10(Math.pow(10, (-STMR / 10)) + Math.exp(-T / 4) * Math.pow(10, (-TELR / 10)));
      //Calculate Ist
      var Ist = 12 * Math.pow(1 + Math.pow((STMRo - 13) / 6, 8), 0.125);
      Ist -= 28 * Math.pow(1 + Math.pow((STMRo + 1) / 19.4, 35), (1 / 35));
      Ist += -13 * Math.pow(1 + Math.pow((STMRo - 3) / 33, 13), (1 / 13)) + 29;

      //Calculate Q
      var Q = 37 - 15 * log10(qdu);
      //Calculate G
      var G = 1.07 + 0.258 * Q + 0.0602 * Q * Q;
      //Calculate Z
      var Z = 46 / 30 - G / 40;
      //Calculate Y
      var Y = (Ro - 100) / 15 + 46 / 8.4 - G / 9;
      //Calculate Iq
      var Iq = 15 * log10(1 + Math.pow(10, Y) + Math.pow(10, Z));
      //Calculate Is = Iolr + Ist + Iq
      var Is = Iolr + Ist + Iq;
      document.getElementById("_Is").value = Math.round(Is * 10) / 10;
      //Calculate TERV
      var TERV = TELR - 40 * log10((1 + T / 10) / (1 + T / 150)) + 6 * Math.exp(-0.3 * T * T);
      if (STMR < 9) {
        TERV = TERV + Ist / 2;
      }
      //Calculate Re
      var Re = 80 + 2.5 * (TERV - 14);
      //Calculate Roe
      var Roe = -1.5 * (No - RLR);
      //Calculate Idte
      var Idte = ((Roe - Re) / 2 + Math.sqrt((Roe - Re) * (Roe - Re) / 4 + 100) - 1) * (1 - Math.exp(-T));
      if (STMR > 20) {
        Idte = Math.sqrt(Idte * Idte + Ist * Ist);
      }
      if (T < 1) {
        Idte = 0;
      }
      //Calculate Rle
      var Rle = 10.5 * (WEPL + 7) * Math.pow((Tr + 1), (-0.25));
      //Calculate Idle
      var Idle = (Ro - Rle) / 2 + Math.sqrt((Ro - Rle) * (Ro - Rle) / 4 + 169);
      //Calculate Idd
      var Idd;
      if (Ta > 100) {
        var X = log10(Ta / 100) / log10(2);
        Idd = 25 * (Math.pow((1 + Math.pow(X, 6)), (1 / 6)) - 3 * Math.pow((1 + Math.pow(X / 3, 6)), (1 / 6)) + 2);
      } else {
        Idd = 0;
      }
      //Calculate Id
      var Id = Idte + Idle + Idd;
      document.getElementById("_Id").value = Math.round(Id * 10) / 10;
      //Calculate Ie_eff
      var Ie_eff = Ie + (95 - Ie) * Ppl / (Ppl + Bpl);
      document.getElementById("_Ie_eff").value = Math.round(Ie_eff * 10) / 10;
      //Calculate R
      var R = Ro - Is - Id - Ie_eff + A;
      document.getElementById("_R").value = Math.round(R * 10) / 10;
      //Calculate MOS
      var MOS;
      if (R < 0) {
        MOS = 1;
      } else if (R > 0 && R < 100) {
        MOS = 1 + 0.035 * R + R * (R - 60) * (100 - R) * 7 * Math.pow(10, -6);
      } else if (R > 100) {
        MOS = 4.5;
      }
      document.getElementById("_MOS").value = Math.round(MOS * 10) / 10;
    }

    function log10(x) {
      return (Math.log(x) / Math.log(10))
    }

    function divide_string() {
      var Ie_Bpl = document.getElementById("_Codec").value;
      var Ie_Bpl_array = Ie_Bpl.split("|");
      document.getElementById("_Ie").value = Ie_Bpl_array[0];
      document.getElementById("_Bpl").value = Ie_Bpl_array[1];
    }
