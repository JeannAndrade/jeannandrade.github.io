---
layout: internal
---

# Novidades C# 3 até 12

Fonte: C# in a Nutshell, Joseph Albahari & Ben Albahari

## C# 3.0

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
Expressão<Func<string,bool>> predicado = s => s.Length > 10;
```

*Expression trees* possibilitam que consultas LINQ sejam executadas remotamente (por exemplo, em um servidor de banco de dados) porque podem ser examinadas e traduzidas em tempo de execução (por exemplo, em uma instrução SQL).

## C# 4.0

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

## C# 5.0

### Asynchronous functions

A grande novidade do C# 5.0 é o suporte para funções assíncronas por meio de duas novas palavras-chave, async e await. As funções assíncronas permitem continuações síncronas, o que facilita a escrita de aplicativos com interfaces ricas e responsivos para o cliente e thread-safe. Eles também facilitam a escrita de aplicações com alto I/O de forma concorrentes e eficientes que não bloqueiam a thread em operação de I/O.
