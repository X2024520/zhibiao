//@version=5
indicator(title='Tom DeMark Sequential Heat Map', shorttitle='TD heatmap', overlay=true, timeframe='')

// -------- Inputs --------
allSolid = input(true, 'Paint all labels solid (off = only 9 & 13)')
len = input(14, title="RSI天数")
lowe = input(40, title="低线")
hight = input(60, title="高线")



buy_col = input.color(color.new(#32CD32,0),'Colors',inline='col')
sell_col = input.color(color.new(#F44336,0),'',inline='col')
text_col = input.color(color.new(#FFFFFF,0),'',inline='col')

// -------- Bearish trend (blue) color selection --------
buyColors = array.from(#11e7f2, #11d9f2, #11cbf2, #11aff2, #1193f2, #1176f2, #105df4, #1051f5, #0f44f5, #0c3de0, #0935ca, #062eb4, #02269e )
currentBuyColor(count) => 
    array.get(buyColors, count-1)

// -------- Bullish trend (red) color selection --------
sellColors = array.from(#eef211, #efdc11, #f0c511, #f1af11, #f29811, #f28811, #f27811, #f26811, #f25811, #ea420d, #e12c09, #d81605, #cf0000 )
currentSellColor(count) => 
    array.get(sellColors, count-1)


// -------- Calculate bearish trend sequence --------
buySetup = 0
buySetup := close < close[4] ? buySetup[1] == 13 ? 1 : buySetup[1] + 1 : 0

// -------- Calculate bullish trend sequence --------
sellSetup = 0
sellSetup := close > close[4] ? sellSetup[1] == 13 ? 1 : sellSetup[1] + 1 : 0


label_col = buySetup >= 1 ? buy_col : sellSetup >= 1 ? sell_col : na
transpLabel = allSolid ? label_col : color.new(label_col,100)
transpLabelText = allSolid ? text_col : label_col

//////////////////////////////RSI////////////////////////
// rsi0 = ta.rsi(close, len)
// buy7 =rsi0 < lowe and buySetup == 7
// buy8 =rsi0 < lowe and buySetup == 8
// buy9 =rsi0 < lowe and buySetup == 9
// buy10 =rsi0 < lowe and buySetup == 10
// buy11 =rsi0 < lowe and buySetup == 11
// buy12 =rsi0 < lowe and buySetup == 12
// buy13 =rsi0 < lowe and buySetup == 13

// sell7 =rsi0>hight and sellSetup == 7
// sell8 =rsi0>hight and sellSetup == 8
// sell9 =rsi0>hight and sellSetup == 9
// sell10 =rsi0>hight and sellSetup == 10
// sell11 =rsi0>hight and sellSetup == 11
// sell12 =rsi0>hight and sellSetup == 12
// sell13 =rsi0>hight and sellSetup == 13

//////////////////RSI///////////////////////////

///////////////////////////TDPR//////////////////////////
// buypres = 0.0
// sellpres = 0.0
// delta = 0.0
// truerange = 0.0
// pres = 0.0
// dom = 0.0
// lenn = input(10)
// for i = 0 to lenn by 1
//     delta := close[i] - open[i]
//     truerange := high[i] - low[i]

//     if delta > 0
//         buypres := buypres + delta / truerange * volume[i]
//         buypres

//     if delta < 0
//         sellpres := sellpres + delta / truerange * volume[i]
//         sellpres

// dom := buypres + math.abs(sellpres)
// if dom != 0.0
//     pres := 100 * (buypres / dom)
//     pres
// else
//     pres := 50
//     pres
    
// buy7 =pres < lowe and buySetup == 7
// buy8 =pres < lowe and buySetup == 8
// buy9 =pres < lowe and buySetup == 9
// buy10 =pres < lowe and buySetup == 10
// buy11 =pres < lowe and buySetup == 11
// buy12 =pres < lowe and buySetup == 12
// buy13 =pres < lowe and buySetup == 13

// sell7 =pres > hight and sellSetup == 7
// sell8 =pres > hight and sellSetup == 8
// sell9 =pres > hight and sellSetup == 9
// sell10 =pres > hight and sellSetup == 10
// sell11 =pres > hight and sellSetup == 11
// sell12 =pres > hight and sellSetup == 12
// sell13 =pres > hight and sellSetup == 13
////////////////////////////////////TDPR//////////////////////

///////////////////////////SToCH RSI/////////////////////
smoothK = input.int(3, "K", minval=1)
smoothD = input.int(3, "D", minval=1)
lengthRSI = input.int(14, "RSI Length", minval=1)
lengthStoch = input.int(14, "Stochastic Length", minval=1)
src = input(close, title="RSI Source")
rsi1 = ta.rsi(src, lengthRSI)
pres = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)

buy7 =pres < lowe and buySetup == 7
buy8 =pres < lowe and buySetup == 8
buy9 =pres < lowe and buySetup == 9
buy10 =pres < lowe and buySetup == 10
buy11 =pres < lowe and buySetup == 11
buy12 =pres < lowe and buySetup == 12
buy13 =pres < lowe and buySetup == 13

sell7 =pres > hight and sellSetup == 7
sell8 =pres > hight and sellSetup == 8
sell9 =pres > hight and sellSetup == 9
sell10 =pres > hight and sellSetup == 10
sell11 =pres > hight and sellSetup == 11
sell12 =pres > hight and sellSetup == 12
sell13 =pres > hight and sellSetup == 13



/////////////////////////STOCH RSI////////////////
// -------- Plot labels --------
plotshape(buy7, title='TD buy sequence 7', location=location.belowbar, style=shape.labelup, size=size.tiny, color=transpLabel, text="7", textcolor=transpLabelText)
plotshape(sell7, title='TD sell sequence 7', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=transpLabel, text="7", textcolor=transpLabelText)
plotshape(buy8, title='TD buy sequence 8', location=location.belowbar, style=shape.labelup, size=size.tiny, color=transpLabel, text="8", textcolor=transpLabelText)
plotshape(sell8 , title='TD sell sequence 8', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=transpLabel, text="8", textcolor=transpLabelText)
plotshape(buy9, title='TD buy sequence 9', location=location.belowbar, style=shape.labelup, size=size.tiny, color=label_col, text="Long", textcolor=text_col)
plotshape(sell9, title='TD sell sequence 9', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=label_col, text="Short", textcolor=text_col)
plotshape(buy10, title='TD buy sequence 10', location=location.belowbar, style=shape.labelup, size=size.tiny, color=transpLabel, text="10", textcolor=transpLabelText)
plotshape(sell10, title='TD sell sequence 10', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=transpLabel, text="10", textcolor=transpLabelText)
plotshape(buy11, title='TD buy sequence 11', location=location.belowbar, style=shape.labelup, size=size.tiny, color=transpLabel, text="11", textcolor=transpLabelText)
plotshape(sell11, title='TD sell sequence 11', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=transpLabel, text="11", textcolor=transpLabelText)
plotshape(buy12, title='TD buy sequence 12', location=location.belowbar, style=shape.labelup, size=size.tiny, color=transpLabel, text="12", textcolor=transpLabelText)
plotshape(sell12 , title='TD sell sequence 12', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=transpLabel, text="12", textcolor=transpLabelText)
plotshape(buy13, title='TD buy sequence 13', location=location.belowbar, style=shape.labelup, size=size.tiny, color=label_col, text="Long", textcolor=text_col)
plotshape(sell13, title='TD sell sequence 13', location=location.abovebar, style=shape.labeldown, size=size.tiny, color=label_col, text="Short", textcolor=text_col)


// -------- Alerts  --------
alertcondition(buySetup == 7, title='Start of BUY zone (TD = 7)', message='{{ticker}} start of BUY zone. TD sequence = 7 on {{interval}} timeframe.')
alertcondition(sellSetup == 7, title='Start of SELL zone (TD = 7)', message='{{ticker}} start of SELL zone. TD sequence = 7 on {{interval}} timeframe.')
alertcondition(buySetup == 9, title='BUY alert (TD = 9)', message='{{ticker}} has a TD buy sequence of 9 on {{interval}} timeframe.')
alertcondition(sellSetup == 9, title='SELL alert (TD = 9)', message='{{ticker}} has a TD sell sequence of 9 on {{interval}} timeframe.')
alertcondition(buySetup == 13, title='BUY alert (TD = 13)', message='{{ticker}} has a TD buy sequence of 13 on {{interval}} timeframe.')
alertcondition(sellSetup == 13, title='SELL alert (TD = 13)', message='{{ticker}} has a TD sell sequence of 13 on {{interval}} timeframe.')
alertcondition(buySetup >= 7 or sellSetup >= 7, title='ANY alert "buy and sell" (TD 7 - 13)  ', message='{{ticker}} has a TD sequence >= 7 on {{interval}} timeframe.')
alertcondition(buySetup == 9 or sellSetup == 9, title='ANY alert "buy and sell" (TD = 9)  ', message='{{ticker}} has a TD sequence >= 9 on {{interval}} timeframe.')
alertcondition(buySetup == 13 or sellSetup == 13, title='ANY alert "buy and sell" (TD = 13)  ', message='{{ticker}} has a TD sequence = 13 on {{interval}} timeframe.')
