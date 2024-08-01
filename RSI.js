//@version=5

indicator(title='RSI抄底', shorttitle='RSI抄底', precision=0)


ttime = input.timeframe('', title='周期')
len = input.int(14, minval=1, title='天数')
upLine = input(75, title='高线')
lowLine = input(25, title='低线')

rsi0 = ta.rsi(close, len)
osc = request.security(syminfo.tickerid, ttime, rsi0)

plot(osc, title='RSI', linewidth=2, color=color.new(#8D1699, 0))
obLevel = hline(upLine, title='高线', color=color.red, linestyle=hline.style_dashed)
osLevel = hline(lowLine, title='低线', color=color.green, linestyle=hline.style_dashed)

//========== 计算金叉死叉==========
lv = ta.crossunder(osc, lowLine)
hong = ta.crossover(osc, upLine)

//========== 标记出金叉死叉的K线==========
bgcolor(lv ? color.new(color.green,25) : na)
bgcolor(hong ? color.new(color.red,25) : na)


//========== 填充背景，判别大趋势==========
bgcolor(osc > upLine ? color.new(color.red,75) : na)
bgcolor(osc < lowLine ? color.new(color.green,75) : na)


plotchar(lv, title="Buy", char='买', location=location.belowbar, color=color.new(color.green,15),size=size.tiny,force_overlay = true)
plotchar(hong, title="Sell", char='卖', location=location.abovebar, color=color.new(color.red,15),size=size.tiny, force_overlay = true)

//plotshape(lv, title = "抄底", text ="开多", textcolor = #FFFFFF, style=shape.labelup, size = size.normal, location=location.belowbar, color = #1B8112, transp = 30)
//plotshape(hong, title = "摸顶", text ="开空", textcolor =#FFFFFF , style=shape.labelup, size = size.normal, location=location.belowbar, color = #FFD306, transp = 30)

//rsi上穿30值报警
//buy=crossover(outRSI,lowLine) //or crossUp
alertcondition(lv, title='抄底', message='抄底')
//rsi下穿70值报警
//sell=crossover(upLine,outRSI)//or crossDn
alertcondition(hong, title='摸顶', message='摸顶')

//fill(p1, p2, color=silver, transp=70)

