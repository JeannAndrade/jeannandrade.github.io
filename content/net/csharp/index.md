# Anotações sobre a linguagem C\#

Fonte: C# in a Nutshell, Joseph Albahari & Ben Albahari

<!-- TOC -->

- [Anotações sobre a linguagem C\#](#anota%C3%A7%C3%B5es-sobre-a-linguagem-c%5C)
  - [C# 3.0](#c-30)
    - [Lambda Expression](#lambda-expression)
    - [Extension methods](#extension-methods)
    - [Implicitly typed local variables](#implicitly-typed-local-variables)
  - [Instanciação de objetos](#instancia%C3%A7%C3%A3o-de-objetos)

<!-- /TOC -->

## C# 3.0

### Lambda Expression

As expressões lambda são como funções em miniatura criadas instantaneamente. Elas são uma evolução natural dos métodos anônimos introduzidos no C# 2.0 e, na verdade, abrangem completamente a funcionalidade dos métodos anônimos. Por exemplo, a seguinte expressão lambda eleva ao quadrado um número inteiro:

```csharp
Func<int, int> square = x => x * x;

Console.WriteLine(square(3));
```

Saída: 9

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

## Instanciação de objetos

A forma reduzida de instanciação. O C# consegue inferir o tipo a partir do tipo do atributo.

```csharp
private static List<GuestResponse> responses = new();
```
