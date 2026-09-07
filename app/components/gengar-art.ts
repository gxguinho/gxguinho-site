// Gengar em arte ASCII, no estilo dos logos que o neofetch imprime.
//
// A silhueta foi derivada do sprite oficial (#94) por cobertura de celula — o
// mesmo truque da arte do Ubuntu, onde a borda usa caractere leve (. : - = + o)
// para simular antialiasing e o miolo e chapado com 's'. O rosto foi desenhado
// a mao: conversao automatica nao consegue resolver olhos e dentes nesta escala.
//
// Marcadores de cor no formato do proprio neofetch: ${c1} vale dali em diante,
// ate o proximo marcador, inclusive atravessando linhas.
//   c1 = corpo   c2 = dentes   c3 = olhos
//
// Aspas simples de proposito: numa template string a crase encerraria a string.
// A arte atual nao tem crase nem barra invertida, mas se voce editar o desenho,
// mantenha assim.

export const GENGAR_ART = [
  '                                          ${c1}.-++.',
  '                            --         .=sssss:',
  '                          -sss      .=sssssss+.',
  '   .-so--:     -s+.=s=. :sssss -ss=ssssssssss-',
  '   .-ssssssss+-+ssssssssssssssssssssssssssss-',
  '     .ssssssssssssssssssssssssssssssssssssss-',
  '      .=sssssssssssssssssssssssssssssssssss-',
  '        .ssssssssssssssssssssssssssssssssss-      :o=.',
  '  - .-   .=sssssssssssssssssssssssssssssss+.  :-+ssss---',
  ' ssssso-: .=sssssssssssssssssssssssssssssssssssssssssss-',
  '  sssssssssssss${c3}@@@${c1}ssssssssssssssssssss${c3}@@@${c1}sssssssssssss-.',
  '-sssssssssssss${c3}@@@@@@${c1}sssssssssssssss${c3}@@@@@@${c1}ssssssssssss.',
  ' --sssssssssss${c3}@@@@@@@${c1}ssssssssssss${c3}@@@@@@@${c1}sssssssssss=.',
  '   .-sssssssssss${c3}@@@@@@${c1}sssssssssss${c3}@@@@@@${c1}ssssssssss=.',
  '     .=ssssssssssss${c3}@@@${c1}sssssssssss${c3}@@@${c1}ssssssssssss:',
  '        .=ssssssssssssssssssssssssssssssssssssss:',
  '         .=ss${c2}MM${c1}ssssssssssssssssssssssssss${c2}MM${c1}sssss:',
  '          :sss${c2}MMMMMMMMMMMMMMMMMMMMMMMMMMMM${c1}ssssss:',
  '           :ssss${c2}sMsMsMsMsMsMsMsMsMsMsMsMs${c1}sssssss=.',
  '            :ssssss${c2}MMMMMMMMMMMMMMMMMM${c1}sssssssssssssss=.',
  '             -ssssssssssssssssssssssssssssssssssssss=.',
  '            .+ssssssssssssssssssssssssssssssssssss=.',
  '            :sssssssssssssssssssssssssssssssss=-.',
  '            .+ssssssssssssssssssssssssssssssss:',
  '             .+ssssssss=.-------.-ssssssssssss:',
  '             -ssssssss=.          .=sssssssss+.',
  '              .----.                .ssssssss-',
  '                                     .--=ss+-.',
];

export const GENGAR_COLORS = {
  c1: '#a97fd0',
  c2: '#fff6ff',
  c3: '#ff5a5a',
} as const;

export type GengarColor = keyof typeof GENGAR_COLORS;
