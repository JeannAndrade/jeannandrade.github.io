---
layout: internal
---

# Novidades C# 3 até 12

Fonte: C# in a Nutshell, Joseph Albahari & Ben Albahari

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
