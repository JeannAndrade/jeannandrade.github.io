---
layout: internal
---

# Novidades C# 3 até 12

Fonte: C# in a Nutshell, Joseph Albahari & Ben Albahari

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Novidades C# 3 até 12](#novidades-c-3-até-12)
  - [C# 3.0 (2007)](#c-30-2007)
    - [Lambda Expression](#lambda-expression)
    - [Extension methods](#extension-methods)
    - [Implicitly typed local variables](#implicitly-typed-local-variables)
    - [Query comprehension](#query-comprehension)
    - [Anonymous types](#anonymous-types)
    - [Implicitly typed arrays](#implicitly-typed-arrays)
    - [Object initializers](#object-initializers)
    - [Automatic properties](#automatic-properties)
    - [Expression trees](#expression-trees)
  - [C# 4.0 (2010)](#c-40-2010)
    - [Dynamic binding](#dynamic-binding)
    - [Type variance with generic interfaces and delegates](#type-variance-with-generic-interfaces-and-delegates)
    - [Optional parameters](#optional-parameters)
    - [Named arguments](#named-arguments)
    - [COM interoperability improvements](#com-interoperability-improvements)
  - [C# 5.0 (2012)](#c-50-2012)
    - [Asynchronous functions](#asynchronous-functions)
  - [C# 6.0 (2015)](#c-60-2015)
    - [null-conditional (“Elvis”) operator](#null-conditional-elvis-operator)
    - [Expression-bodied functions](#expression-bodied-functions)
    - [Property initializers](#property-initializers)
    - [Index initializers](#index-initializers)
    - [String interpolation](#string-interpolation)
    - [Exception filters](#exception-filters)
    - [using static](#using-static)
    - [nameof](#nameof)
  - [C# 7.0 (2017)](#c-70-2017)
    - [Numeric literal improvements](#numeric-literal-improvements)
    - [Out variables and discards](#out-variables-and-discards)
    - [Patterns](#patterns)
    - [Local methods](#local-methods)
    - [More expression-bodied members](#more-expression-bodied-members)
    - [Deconstructors](#deconstructors)
    - [Tuples](#tuples)
    - [throw expressions](#throw-expressions)

<!-- TOC end -->

## C# 3.0 (2007)

### Lambda Expression

As expressões lambda são como funções em miniatura criadas instantaneamente. Eles são uma evolução natural dos métodos anônimos introduzidos no C# 2.0 e, na verdade, abrangem completamente a funcionalidade dos métodos anônimos. Por exemplo, a seguinte expressão lambda eleva ao quadrado um número inteiro:

```csharp
Func<int,int> square = x => x * x;
Console.WriteLine (square(3));         // 9
```

Para pessoas familiarizadas com linguagens de programação funcionais, como Scheme e Haskell, as expressões lambda serão uma construção familiar. O principal caso de uso em C# é com consultas LINQ, como as seguintes:

```csharp
string[] names = { "Tom", "Dick", "Harry" };

// Include only names of >= 4 characters.
IEnumerable<string> filteredNames = Enumerable.Where(names, n => n.Length >= 4);

filteredNames.ToList().ForEach(x => Console.WriteLine(x));
```

Saída: Dick Harry

### Extension methods

Os métodos de extensão estendem um tipo existente com novos métodos, sem alterar a definição do tipo. Eles agem como açúcar sintático, fazendo com que os métodos estáticos pareçam métodos de instância. Como os operadores de consulta do LINQ são implementados como métodos de extensão, podemos simplificar nossa consulta anterior da seguinte forma:

Antes:

```csharp
string[] names = { "Tom", "Dick", "Harry" };

// Include only names of >= 4 characters.
IEnumerable<string> filteredNames = Enumerable.Where(names, n => n.Length >= 4);
```

Depois:

```csharp
IEnumerable<string> filteredNames = names.Where (n => n.Length >= 4);
```

### Implicitly typed local variables

Variáveis locais tipadas implicitamente permitem omitir o tipo de variável em uma instrução de declaração, permitindo que o compilador o infira. Como o compilador pode determinar o tipo de FilteredNames, podemos simplificar ainda mais nossa consulta:

```csharp
var filteredNames = names.Where(n => n.Length == 4);
```

### Query comprehension

 A sintaxe *Query comprehension* fornece sintaxe no estilo SQL para escrever consultas. A sintaxe *Query comprehension* pode simplificar substancialmente certos tipos de consultas, além de servir como açúcar sintático para consultas no estilo lambda. Aqui está o exemplo anterior em sintaxe de compreensão:

```csharp
var filteredNames =from n in names where n.Length >= 4 select n;
```

### Anonymous types

Tipos anônimos são classes simples criadas dinamicamente que são comumente usadas na saída final de consultas.

```csharp
string[] names = { "Tom", "Dick", "Harry" };

var query = from n in names
            where n.Length >= 4
            select new
            {
              Name = n,
              n.Length
            };

query.ToList().ForEach(name => Console.WriteLine($"Name: {name.Name}, length: {name.Length}"));
```

Outro exemplo de tipos anônimos:

```csharp
var dude = new { Name = "Bob", Age = 20 };
```

### Implicitly typed arrays

*Implicitly typed arrays* eliminam a necessidade de indicar o tipo do array ao construir e inicializar uma matriz em uma única etapa:

```csharp
var dudes = new[]
{
   new { Name = "Bob", Age = 20 },
   new { Name = "Rob", Age = 30 }
};

dudes.ToList().ForEach(x => Console.WriteLine($"name: {x.Name}, age: {x.Age}"));
```

### Object initializers

Os inicializadores de objetos simplificam a construção de objetos, permitindo que as propriedades sejam definidas em linha após a chamada do construtor. Os inicializadores de objetos funcionam com tipos anônimos e nomeados. O exemplo a seguir mostra o novo recurso do C# 3.0 e o código equivalente no C# 2.0:

```csharp
// C# 3.0
Bunny b1 = new Bunny { Name = "Bo", LikesCarrots = true, LikesHumans = false };

// C# 2.0
Bunny b2 = new Bunny();
b2.Name = "Bo";
b2.LikesHumans = false;
```

### Automatic properties

Propriedades automáticas eliminam o trabalho de escrever propriedades que simplesmente obtêm/definem um campo de apoio privado. No exemplo a seguir, o compilador gera automaticamente um campo de apoio privado para X:

```csharp
public class Stock
{
  // C# 3.0:
  public decimal X { get; set; }

  // C# 2.0:
  private decimal y;
  public decimal Y
  {
    get { return y;  }
    set { y = value; }
  }
}
```

### Expression trees

*Expression trees* são DOMs de código em miniatura que descrevem expressões lambda. O compilador C# 3.0 gera árvores de expressão quando uma expressão lambda é atribuída ao tipo especial Expression<TDelegate>:

```csharp
Expression<Func<string,bool>> predicado = s => s.Length > 10;
```

*Expression trees* possibilitam que consultas LINQ sejam executadas remotamente (por exemplo, em um servidor de banco de dados) porque podem ser examinadas e traduzidas em tempo de execução (por exemplo, em uma instrução SQL).

## C# 4.0 (2010)

### Dynamic binding

A vinculação dinâmica é a maior inovação do C# 4.0. Este recurso foi inspirado em linguagens dinâmicas como Python, Ruby, JavaScript e Smalltalk. A vinculação dinâmica adia a vinculação – o processo de resolução de tipos e membros – do tempo de compilação para o tempo de execução. Embora C# continue sendo uma linguagem predominantemente de tipagem estática, uma variável do tipo dinâmico é resolvida de maneira tardia. Por exemplo:

```csharp
dynamic d = "hello";
Console.WriteLine (d.ToUpper());  // HELLO
Console.WriteLine (d.Foo());      // Compiles OK but gives runtime error
```

Chamar um objeto dinamicamente é útil em cenários que, de outra forma, exigiriam um código de reflexão complicado. A ligação dinâmica também é útil ao interoperar com linguagens dinâmicas e componentes COM.

### Type variance with generic interfaces and delegates

### Optional parameters

Parâmetros opcionais permitem que funções especifiquem valores de parâmetros padrão para que os chamadores possam omitir argumentos. Uma declaração de parâmetro opcional, como:

```csharp
void Foo (int x = 23) { Console.WriteLine (x); }
```

pode ser chamado da seguinte forma:

```csharp
Foo(); // 23
```

### Named arguments

Argumentos nomeados permitem que um chamador de função identifique um argumento pelo nome em vez de pela posição. Por exemplo, o método anterior agora pode ser chamado da seguinte forma:

```csharp
Foo (x:5);
```

### COM interoperability improvements

## C# 5.0 (2012)

### Asynchronous functions

A grande novidade do C# 5.0 é o suporte para funções assíncronas por meio de duas novas palavras-chave, async e await. As funções assíncronas permitem continuações síncronas, o que facilita a escrita de aplicativos com interfaces ricas e responsivos para o cliente e thread-safe. Eles também facilitam a escrita de aplicações com alto I/O de forma concorrentes e eficientes que não bloqueiam a thread em operação de I/O.

## C# 6.0 (2015)

A maior novidade do C# 6.0 é que o compilador foi completamente reescrito em C#. Conhecido como projeto “Roslyn”, o novo compilador expõe todo o pipeline de compilação por meio de bibliotecas, permitindo realizar análises de código em código-fonte arbitrário.

### null-conditional (“Elvis”) operator

O operador nulo-condicional (“Elvis”) evita ter que verificar explicitamente nulo antes de chamar um método ou acessar um membro de tipo. No exemplo a seguir, o resultado é avaliado como nulo em vez de gerar uma NullReferenceException:

```csharp
System.Text.StringBuilder sb = null;
string result = sb?.ToString(); // result is null
```

### Expression-bodied functions

Funções com corpo de expressão permitem que métodos, propriedades, operadores e indexadores que compõem uma única expressão sejam escritos de forma mais concisa, no estilo de uma expressão lambda:

```csharp
public int TimesTwo (int x) => x * 2;
public string SomeProperty => "Property value";
```

### Property initializers

Os inicializadores de propriedade permitem atribuir um valor inicial a uma propriedade automática:

```csharp
public DateTime Created { get; set; } = DateTime.Now;
```

A inicialização também pode ser read-only:

```csharp
public DateTime Created { get; } = DateTime.Now;
```

Propriedades somente leitura também podem ser definidas no construtor, facilitando a criação de tipos imutáveis (somente leitura).

### Index initializers

Os inicializadores de índice permitem a inicialização em uma única etapa de qualquer tipo que exponha um indexador:

```csharp
new Dictionary<int,string>()
{
  [3] = "three",
  [10] = "ten"
}
```

### String interpolation

A interpolação de strings oferece uma alternativa sucinta à string. Formatar:

```csharp
string s = $"It is {DateTime.Now.DayOfWeek} today";
```

### Exception filters

Os filtros de exceção permitem aplicar uma condição a um bloco catch:

```csharp
try
{
  new WebClient().DownloadString("<http://asef>");
}
catch (WebException ex) when (ex.Status == WebExceptionStatus.Timeout)
{
  ...
}
```

### using static

A diretiva using static permite importar todos os membros estáticos de um tipo, para que você possa usar esses membros sem qualificação:

```csharp
using static System.Console;
  ...
WriteLine ("Hello, world"); // WriteLine instead of Console.WriteLine
```

### nameof

O operador nameof (Capítulo 3) retorna o nome de uma variável, tipo ou outro símbolo como uma string. Isso evita quebrar o código ao renomear um símbolo no Visual Studio:

```csharp
int capacity = 123;
string x = nameof (capacity); // x is "capacity"
string y = nameof (Uri.Host); // y is "Host"
```

## C# 7.0 (2017)

### Numeric literal improvements

Literais numéricos em C# 7 podem incluir sublinhados para melhorar a legibilidade. Eles são chamados de separadores de dígitos e são ignorados pelo compilador:

```csharp
int million = 1_000_000;
```

Literais binários podem ser especificados com o prefixo 0b:

```csharp
var b = 0b1010_1011_1100_1101_1110_1111;
```

### Out variables and discards

O C# 7 facilitou a chamada de métodos que contêm parâmetros *out*. Primeiro, agora você pode declarar variáveis instantaneamente:

```csharp
bool successful = int.TryParse ("123", out int result);
Console.WriteLine (result);
```

E ao chamar um método com vários parâmetros de saída, você pode descartar aqueles que não lhe interessam com o caractere de sublinhado:

```csharp
SomeBigMethod (out _, out _, out _, out int x, out _, out _, out _);
Console.WriteLine (x);
```

### Patterns

Você também pode introduzir variáveis instantâneas com o operador *is*. Elas são chamadas de *pattern variables*:

```csharp
void Foo (object x)
{
  if (x is string s)
    Console.WriteLine (s.Length);
}
```

É equivalente a:

```csharp
Stock s;
if (a is Stock)
{
  s = (Stock) a;
  Console.WriteLine (s.SharesOwned);
}
```

A instrução switch também oferece suporte a padrões, para que você usar switch com tipo e também as constantes. Você pode especificar condições com uma cláusula quando e também ativar o valor nulo:

```csharp
switch (x) // x é um object
{
  case int i:
    Console.WriteLine ("It's an int!");
    break;
  case string s:
    Console.WriteLine (s.Length); // We can use the s variable
    break;
  case bool b when b == true:  // Matches only when b is true
    Console.WriteLine ("True");
    break;
  case null:
    Console.WriteLine ("Nothing");
    break;
}
```

### Local methods

Um método local é um método declarado dentro de outra função:

```csharp
void WriteCubes()
{
  Console.WriteLine (Cube (3));
  Console.WriteLine (Cube (4));
  Console.WriteLine (Cube (5));
  int Cube (int value) => value * value * value;
}
```

Os métodos locais são visíveis apenas para a função que os contém e podem capturar variáveis locais da mesma forma que as expressões lambda.

### More expression-bodied members

O C# 6 introduziu a sintaxe “fat-arrow” com corpo de expressão para métodos, propriedades somente leitura, operadores e indexadores. C# 7 estende isso para construtores, propriedades de leitura/gravação e finalizadores:

```csharp
public class Person
{
  string name;
  public Person (string name) => Name = name;

  public string Name
  {
    get => name;
    set => name = value ?? "";
  }

  ~Person () => Console.WriteLine ("finalize");
}
```

### Deconstructors

C# 7 introduziu o padrão desconstrutor. Enquanto um construtor normalmente pega um conjunto de valores (como parâmetros) e os atribui aos campos, um desconstrutor faz o inverso e atribui os campos de volta a um conjunto de variáveis. Poderíamos escrever um desconstrutor para a classe Person no exemplo anterior da seguinte maneira (deixando de lado o tratamento de exceções):

```csharp
public void Deconstruct (out string firstName, out string lastName)
{
  int spacePos = name.IndexOf (' ');
  firstName = name.Substring (0, spacePos);
  lastName = name.Substring (spacePos + 1);
}
```

Os desconstrutores são chamados com a seguinte sintaxe especial:

```csharp
var joe = new Person ("Joe Bloggs");
var (first, last) = joe;    // Deconstruction
Console.WriteLine (first);  // Joe
Console.WriteLine (last);   // Bloggs
```

### Tuples

Talvez a melhoria mais notável no C# 7 seja o suporte explícito a tuplas. As tuplas fornecem uma maneira simples de armazenar um conjunto de valores relacionados:

```csharp
var bob = ("Bob", 23);
Console.WriteLine (bob.Item1);  // Bob
Console.WriteLine (bob.Item2);  // 23
```

As novas tuplas do C# são açúcar sintático para usar as estruturas genéricas System.ValueTuple<...>. Mas graças à magia do compilador, os elementos da tupla podem ser nomeados:

```csharp
var tuple = (Name:"Bob", Age:23);
Console.WriteLine (tuple.Name);   // Bob
Console.WriteLine (tuple.Age);    // 23
```

Com tuplas, as funções podem retornar vários valores sem recorrer a parâmetros *out*:

```csharp
static (int row, int column) GetFilePosition() => (3, 10);

static void Main()
{
  var pos = GetFilePosition();
  Console.WriteLine (pos.row);    // 3
  Console.WriteLine (pos.column); // 10
}
```

As tuplas suportam implicitamente o padrão de desconstrução, para que possam ser facilmente desconstruídas em variáveis individuais. Podemos reescrever o método Main anterior para que a tupla retornada por GetFilePosition seja atribuída a duas variáveis locais, row e column:

```csharp
static void Main()
{
  (int row, int column) = GetFilePosition();
  Console.WriteLine (row);    // 3
  Console.WriteLine (column); // 10
}
```

### throw expressions

Antes do C# 7, throw sempre era uma instrução. Agora também pode aparecer como uma expressão em funções com corpo de expressão:

```csharp
public string Foo() => throw new NotImplementedException();
```

Uma expressão throw também pode aparecer em uma expressão condicional ternária:

```csharp
string Capitalize (string value) =>
  value == null ? throw new ArgumentException ("value") :
  value == "" ? "" :
  char.ToUpper (value[0]) + value.Substring (1);
```

## C# 8.0 (2019)

### Indices And Ranges

Índices e intervalos simplificam o trabalho com elementos ou partes de um array. Os índices permitem fazer referência a elementos relativos ao final de um array usando o operador ^. ^1 refere-se ao último elemento, ^2 refere-se ao penúltimo elemento e assim por diante:

```csharp
char[] vowels = new char[] {'a','e','i','o','u'};
char lastElement  = vowels [^1];   // 'u'
char secondToLast = vowels [^2];   // 'o'
```

Os intervalos permitem “dividir” um array usando o operador '..':

```csharp
char[] firstTwo =  vowels [..2];    // 'a', 'e'
char[] lastThree = vowels [2..];    // 'i', 'o', 'u'
char[] middleOne = vowels [2..3]    // 'i'
char[] lastTwo =   vowels [^2..];   // 'o', 'u'
```

C# implementa índices e intervalos com a ajuda dos tipos Index e Range:

```csharp
Index last = ^1;
Range firstTwoRange = 0..2;
char[] firstTwo = vowels [firstTwoRange];   // 'a', 'e'
```

Você pode oferecer suporte a índices e intervalos em suas próprias classes definindo um indexador com um tipo de parâmetro Index ou Range:

```csharp
class Sentence
{
  string[] words = "The quick brown fox".Split();

  public string this   [Index index] => words [index];
  public string[] this [Range range] => words [range];
}

var sentence = new Sentence();
Range firstTwo = 0..2;

System.Console.WriteLine(sentence[0]);  //The
System.Console.WriteLine(sentence[1]);  //quick
System.Console.WriteLine(sentence[2]);  //brown
System.Console.WriteLine(string.Join(" ", sentence[firstTwo]));  //The quick

```

### Null-Coalescing Assignment

O operador ??= atribui uma variável apenas se ela for nula. Em vez disso:

```csharp
if (s == null) s = "Hello, world";
```

agora você pode escrever isto:

```csharp
s ??= "Hello, world";
```

### Using Declarations

Se você omitir os colchetes e o bloco de instruções após uma instrução using, ela se tornará uma declaração using. O recurso é então descartado quando a execução fica fora do bloco de instrução envolvente:

```csharp
if (File.Exists ("file.txt"))
{
  using var reader = File.OpenText ("file.txt");
  Console.WriteLine (reader.ReadLine());
  ...
}
```

Nesse caso, o reader será descartado quando a execução estiver fora do bloco de instrução if.

### Readonly Members

C# 8 permite aplicar o modificador readonly às funções de um struct, garantindo que se a função tentar modificar qualquer campo, um erro em tempo de compilação será gerado:

```csharp
struct Point
{
  public int X, Y;
  public readonly void ResetX() => X = 0;  // Error!
}
```

Se uma função somente leitura chamar uma função não somente leitura, o compilador gerará um aviso (e copiará defensivamente a estrutura para evitar a possibilidade de uma mutação).

### Static Local Methods

Adicionar o modificador estático a um método local evita que ele veja as variáveis e parâmetros locais do método envolvente. Isso ajuda a reduzir o acoplamento, bem como permite que o método local declare variáveis como desejar, sem risco de colidir com aquelas do método que o contém.

```csharp
string[] words = "The quick brown fox".Split();

System.Console.WriteLine(LetterCounter(words));


int LetterCounter(string[] sentence)
{
  int counter = 0;

  foreach (var word in sentence)
  {
    counter += LettersInWord(word);
  }

  static int LettersInWord(string word)
  {
    return word.Length;
  }

  return counter;
}
```

### Default Interface Members

C# 8 permite adicionar uma implementação padrão a um membro da interface, tornando opcional a implementação:

```csharp
interface ILogger
{
  void Log (string text) => Console.WriteLine (text);
}
```

Isso significa que você pode adicionar um membro a uma interface sem quebrar as implementações. As implementações padrão devem ser chamadas explicitamente através da interface:

```csharp
((ILogger)new Logger()).Log ("message");
```

As interfaces também podem definir membros estáticos (incluindo campos), que podem ser acessados a partir do código dentro de implementações padrão:

```csharp
interface ILogger
{
  void Log (string text) => Console.WriteLine (Prefix + text);
  static string Prefix = "";
}
```

ou de fora da interface:

```csharp
ILogger.Prefix = "File log: ";
```

a menos que seja restrito por meio de um modificador de acessibilidade no membro da interface estática (como privado, protegido ou interno). Campos de instância são proibidos.

### Switch Expressions

No C# 8, você pode usar switch no contexto de uma expressão:

```csharp
string cardName = cardNumber switch    // assuming cardNumber is an int
{
  13 => "King",
  12 => "Queen",
  11 => "Jack",
  _ => "Pip card"   // equivalent to 'default'
};
```

### Tuple, Positional, And Property Patterns

O C# 8 oferece suporte a três novos padrões, principalmente para o benefício de instruções/expressões switch. Os padrões de tupla permitem ativar vários valores:

```csharp
int cardNumber = 12; string suite = "espadas";
string cardName = (cardNumber, suite) switch
{
  (13, "espadas") => "Rei de espadas",
  (13, "paus") => "Rei de paus",
  ...
};
```

Os padrões posicionais permitem uma sintaxe semelhante para objetos que expõem um desconstrutor, e os padrões de propriedade permitem fazer a correspondência com as propriedades de um objeto. Você pode usar todos os padrões tanto em switches quanto pelo operador is. O exemplo a seguir usa um padrão de propriedade para testar se obj é uma string com comprimento 4:

```csharp
if (obj is string { Length:4 }) ...
```

### Nullable Reference Types

Enquanto os tipos de valor anuláveis trazem nulidade aos tipos de valor, os tipos de referência anuláveis fazem o oposto e trazem (um grau de) não nulidade aos tipos de referência, com o objetivo de ajudar a evitar NullReferenceExceptions. Os tipos de referência anuláveis introduzem um nível de segurança que é imposto exclusivamente pelo compilador na forma de avisos ou erros quando ele detecta código que corre o risco de gerar uma NullReferenceException.

Os tipos de referência anuláveis podem ser habilitados no nível do projeto (por meio do elemento Nullable no arquivo de projeto .csproj) ou no código (por meio da diretiva #nullable). Depois de habilitado, o compilador torna a não nulidade o padrão: se você deseja que um tipo de referência aceite nulos, você deve aplicar o ? sufixo para indicar um tipo de referência anulável:

```csharp
#nullable enable    // Enable nullable reference types from this point on

string s1 = null;   // Generates a compiler warning! (s1 is non-nullable)
string? s2 = null;  // OK: s2 is nullable reference type
```

Os campos não inicializados também geram um aviso (se o tipo não estiver marcado como anulável), assim como a desreferenciação de um tipo de referência anulável, se o compilador achar que uma Null​ReferenceException pode ocorrer:

```csharp
void Foo (string? s) => Console.Write (s.Length);  // Warning (.Length)
```

Para remover o aviso, você pode usar o operador de null-forgiving (!):

```csharp
void Foo (string? s) => Console.Write (s!.Length);
```

### Asynchronous Streams
