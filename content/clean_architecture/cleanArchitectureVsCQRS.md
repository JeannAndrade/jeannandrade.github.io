# Clean Architecture (Interactor/Boundaries) vs CQRS (Command/Query)

Fonte: Claude IA

Achei esse conceito de Interactor e Boundaries parecido com o conceito de Command Query. Existe alguma semelhança? Quais pontos são semelhantes e quais são diferentes?

## 🎯 Visão Geral

Você está absolutamente correto em perceber a semelhança! Ambos os padrões compartilham filosofias similares, mas têm propósitos e contextos diferentes.

---

## 📊 Tabela Comparativa Rápida

| Aspecto | Clean Architecture (Boundaries) | CQRS (Command Query) |
| --------- | -------------------------------- | --------------------- |
| **Origem** | Clean Architecture (Uncle Bob) | CQRS Pattern (Greg Young) |
| **Foco Principal** | Separação de camadas arquiteturais | Separação de leitura e escrita |
| **Granularidade** | Por caso de uso (use case) | Por operação (comando ou consulta) |
| **Objetivo** | Independência de frameworks | Otimização e escalabilidade |
| **Complexidade** | Moderada | Pode ser muito alta |
| **Input** | Request Model | Command / Query |
| **Output** | Response Model via Presenter | Command Result / Query Result |

---

## 🔍 Semelhanças Detalhadas

### 1. **Separação de Responsabilidades**

**Clean Architecture:**

```csharp
// Entrada
IRegisterPersonInputBoundary.Execute(RequestModel)

// Saída
IRegisterPersonOutputBoundary.Present(ResponseModel)
```

**CQRS:**

```csharp
// Command (escrita)
ICommandHandler<RegisterPersonCommand, RegisterPersonResult>

// Query (leitura)
IQueryHandler<GetPersonsQuery, List<PersonDto>>
```

**Similaridade:** Ambos separam claramente entrada e saída, usando objetos específicos (DTOs).

---

### 2. **Objetos de Transferência de Dados (DTOs)**

**Clean Architecture:**

```csharp
// Request Model
public class RegisterPersonRequestModel
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime BirthDate { get; set; }
}

// Response Model
public class RegisterPersonResponseModel
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public Guid? PersonId { get; set; }
}
```

**CQRS:**

```csharp
// Command
public class RegisterPersonCommand
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime BirthDate { get; set; }
}

// Command Result
public class RegisterPersonResult
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public Guid? PersonId { get; set; }
}
```

**Similaridade:** DTOs imutáveis que transportam dados entre camadas.

---

### 3. **Handlers/Interactors Executam Lógica**

**Clean Architecture:**

```csharp
public class RegisterPersonInteractor : IRegisterPersonInputBoundary
{
    public void Execute(RegisterPersonRequestModel request)
    {
        // 1. Validar
        // 2. Aplicar regras de negócio
        // 3. Persistir
        // 4. Retornar resposta via OutputBoundary
    }
}
```

**CQRS:**

```csharp
public class RegisterPersonCommandHandler
    : ICommandHandler<RegisterPersonCommand, RegisterPersonResult>
{
    public RegisterPersonResult Handle(RegisterPersonCommand command)
    {
        // 1. Validar
        // 2. Aplicar regras de negócio
        // 3. Persistir
        // 4. Retornar resultado
    }
}
```

**Similaridade:** Encapsulam lógica de negócio em handlers específicos para cada operação.

---

### 4. **Princípio da Responsabilidade Única (SRP)**

Ambos seguem o SRP criando:

- ✅ Um objeto para cada operação
- ✅ Um handler para cada operação
- ✅ Separação clara de preocupações

---

## 🔄 Diferenças Fundamentais

### 1. **Propósito Arquitetural**

**Clean Architecture (Boundaries):**

- **Objetivo:** Criar fronteiras arquiteturais entre camadas
- **Foco:** Independência de frameworks e testabilidade
- **Escopo:** Toda a aplicação (camadas concêntricas)

```
View → Controller → InputBoundary → Interactor → Gateway
                                       ↓
View ← Presenter ← OutputBoundary ← Interactor
```

**CQRS:**

- **Objetivo:** Separar modelos de leitura e escrita
- **Foco:** Performance, escalabilidade, modelo de dados otimizado
- **Escopo:** Camada de persistência e modelo de dados

```
Command → Write Model → Write Database
Query → Read Model → Read Database (pode ser diferente!)
```

---

### 2. **Separação Read/Write**

**Clean Architecture:**

- **NÃO separa** explicitamente operações de leitura e escrita
- Ambas seguem o mesmo fluxo de boundaries
- Mesmo banco de dados para leitura e escrita

```csharp
// Ambos usam IPersonGateway
RegisterPersonInteractor → IPersonGateway.Save()
ListPersonsInteractor → IPersonGateway.GetAll()
```

**CQRS:**

- **SEPARA explicitamente** Commands (escrita) de Queries (leitura)
- Pode usar modelos de dados diferentes
- Pode usar bancos de dados diferentes!

```csharp
// Commands (Write)
RegisterPersonCommand → WriteRepository → SQL Database

// Queries (Read)
GetPersonsQuery → ReadRepository → NoSQL Database (denormalizado)
```

---

### 3. **Modelo de Dados**

**Clean Architecture:**

- **Modelo único** (mesma entidade para leitura e escrita)
- `Person` entity serve tanto para salvar quanto para recuperar

```csharp
// Mesma entidade
public class Person
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    // ... usado para tudo
}
```

**CQRS:**

- **Modelos separados** (Write Model vs Read Model)
- Otimização específica para cada operação

```csharp
// Write Model (normalizado)
public class Person
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// Read Model (denormalizado, otimizado para consulta)
public class PersonListItem
{
    public Guid Id { get; set; }
    public string FullDisplayName { get; set; } // pré-calculado
    public int Age { get; set; } // pré-calculado
    public string FormattedPhone { get; set; } // pré-formatado
}
```

---

### 4. **Complexidade e Sincronização**

**Clean Architecture:**

- ✅ **Simples:** Operação síncrona e imediata
- ✅ Sem necessidade de sincronização
- ✅ Consistência imediata

```csharp
// Salva e está disponível imediatamente
gateway.Save(person);
var persons = gateway.GetAll(); // pessoa já está aqui
```

**CQRS:**

- ⚠️ **Complexo:** Pode ser assíncrono
- ⚠️ Necessita sincronização entre modelos
- ⚠️ Consistência eventual (em alguns casos)

```csharp
// Command
commandHandler.Handle(new RegisterPersonCommand());
// Publica evento

// Event Handler (assíncrono)
eventHandler.Handle(PersonRegisteredEvent);
// Atualiza Read Model

// Query (pode não ter a pessoa ainda!)
queryHandler.Handle(new GetPersonsQuery());
```

---

### 5. **Presenter vs Result**

**Clean Architecture:**

- Usa **Presenter** (padrão adicional)
- Separa transformação de dados da resposta
- Presenter formata dados para a View

```csharp
// Interactor envia para Presenter
outputBoundary.Present(responseModel);

// Presenter cria ViewModel
public class RegisterPersonPresenter : IRegisterPersonOutputBoundary
{
    public RegisterPersonViewModel ViewModel { get; private set; }

    public void Present(RegisterPersonResponseModel response)
    {
        ViewModel = new RegisterPersonViewModel
        {
            Message = response.Success
                ? "✓ Sucesso!"
                : "✗ Erro: " + response.Message
        };
    }
}

// View consome ViewModel
view.Display(presenter.ViewModel);
```

**CQRS:**

- Retorna **Result** diretamente
- Sem camada intermediária de apresentação
- Handler retorna o resultado final

```csharp
// Handler retorna resultado
public RegisterPersonResult Handle(RegisterPersonCommand cmd)
{
    return new RegisterPersonResult
    {
        Success = true,
        PersonId = person.Id
    };
}

// Controller/View usa diretamente
var result = commandHandler.Handle(command);
return result.Success ? Ok(result) : BadRequest(result);
```

---

## 🎨 Exemplo Prático: Implementando CQRS na Aplicação

Vou mostrar como seria nossa aplicação usando **CQRS puro**:

### **Estrutura CQRS**

```
Commands/
├── RegisterPerson/
│   ├── RegisterPersonCommand.cs
│   ├── RegisterPersonCommandHandler.cs
│   └── RegisterPersonCommandResult.cs
└── UpdatePerson/
    ├── UpdatePersonCommand.cs
    └── UpdatePersonCommandHandler.cs

Queries/
├── GetAllPersons/
│   ├── GetAllPersonsQuery.cs
│   ├── GetAllPersonsQueryHandler.cs
│   └── PersonListDto.cs
└── GetPersonById/
    ├── GetPersonByIdQuery.cs
    └── GetPersonByIdQueryHandler.cs
```

### **Command Implementation**

```csharp
// Command (imutável)
public record RegisterPersonCommand(
    string Name,
    string Email,
    string Phone,
    DateTime BirthDate
);

// Command Handler
public class RegisterPersonCommandHandler
    : ICommandHandler<RegisterPersonCommand, CommandResult<Guid>>
{
    private readonly IWriteRepository _writeRepo;
    private readonly IEventBus _eventBus;

    public CommandResult<Guid> Handle(RegisterPersonCommand command)
    {
        // 1. Validar
        if (CalculateAge(command.BirthDate) < 20)
            return CommandResult<Guid>.Failure("Idade mínima: 20 anos");

        // 2. Criar entidade
        var person = new Person(
            command.Name,
            command.Email,
            command.Phone,
            command.BirthDate
        );

        // 3. Persistir no Write Model
        _writeRepo.Save(person);

        // 4. Publicar evento (para atualizar Read Model)
        _eventBus.Publish(new PersonRegisteredEvent(person));

        // 5. Retornar resultado
        return CommandResult<Guid>.Success(person.Id);
    }
}
```

### **Query Implementation**

```csharp
// Query (imutável)
public record GetAllPersonsQuery();

// Query Handler
public class GetAllPersonsQueryHandler
    : IQueryHandler<GetAllPersonsQuery, List<PersonListDto>>
{
    private readonly IReadRepository _readRepo;

    public List<PersonListDto> Handle(GetAllPersonsQuery query)
    {
        // Lê do Read Model (pode ser denormalizado)
        return _readRepo.GetAllPersons();
    }
}

// DTO otimizado para leitura
public class PersonListDto
{
    public Guid Id { get; set; }
    public string DisplayName { get; set; } // pré-formatado
    public string ContactInfo { get; set; } // email + phone combinados
    public int Age { get; set; } // pré-calculado
    public string AgeGroup { get; set; } // "20-30", "31-40", etc
}
```

---

## 🤔 Qual Usar e Quando?

### **Use Clean Architecture (Boundaries) quando:**

✅ Você precisa de **independência de frameworks**
✅ Testabilidade é prioridade
✅ Aplicação de **complexidade média**
✅ Time pequeno/médio
✅ Modelo de dados **simples a moderado**
✅ Consistência imediata é necessária

**Exemplo:** Aplicações corporativas típicas, APIs REST, sistemas CRUD

---

### **Use CQRS quando:**

✅ **Performance de leitura** é crítica
✅ Leituras são muito mais frequentes que escritas (ratio 100:1)
✅ Necessita de **modelos otimizados** diferentes para leitura/escrita
✅ Escalabilidade horizontal é necessária
✅ Aceita **consistência eventual**
✅ Time experiente com arquiteturas distribuídas

**Exemplo:** E-commerce (catálogo de produtos), sistemas de relatórios, dashboards

---

### **Use AMBOS quando:**

✅ Sistema **grande e complexo**
✅ Necessita de **todas as vantagens** de ambos
✅ Recursos disponíveis (time experiente, tempo, orçamento)

**Estrutura híbrida:**

```
Clean Architecture (estrutura geral)
    │
    ├── Entities (centro)
    │
    ├── Use Cases
    │   ├── Commands/ (CQRS)
    │   │   ├── RegisterPersonCommand
    │   │   └── UpdatePersonCommand
    │   │
    │   └── Queries/ (CQRS)
    │       ├── GetAllPersonsQuery
    │       └── GetPersonByIdQuery
    │
    ├── Interface Adapters
    │   ├── Controllers
    │   └── Presenters
    │
    └── Frameworks & Drivers
        ├── WriteDatabase (SQL)
        └── ReadDatabase (NoSQL/Cache)
```

---

## 📈 Diagrama Comparativo

```
CLEAN ARCHITECTURE (nossa implementação)
────────────────────────────────────────

Request → Controller → InputBoundary → Interactor → Gateway → Database
                                           ↓
Response ← View ← Presenter ← OutputBoundary ← Interactor

• Fluxo único para leitura e escrita
• Mesmo banco de dados
• Consistência imediata
• Complexidade moderada


CQRS PURO
─────────

WRITE:
Command → CommandHandler → WriteModel → WriteDB → Event
                                                    ↓
                                              EventHandler
                                                    ↓
READ:                                         ReadModel → ReadDB
Query → QueryHandler → ReadModel → ReadDB

• Fluxos separados
• Bancos diferentes (pode ser)
• Consistência eventual (pode ser)
• Complexidade alta


HÍBRIDO (Clean + CQRS)
──────────────────────

         Clean Architecture
         ┌─────────────┐
         │  Entities   │
         └──────┬──────┘
                │
    ┌───────────┴───────────┐
    │                       │
Commands (Write)      Queries (Read)
    │                       │
WriteModel              ReadModel
    │                       │
WriteDB                  ReadDB

• Melhor dos dois mundos
• Máxima flexibilidade
• Complexidade muito alta
```

---

## 💡 Resumo das Diferenças-Chave

| Característica | Clean Arch | CQRS |
| --------------- | ------------ | ------ |
| **Separation of Concerns** | ✅ Por camada | ✅ Por operação |
| **Read/Write Separation** | ❌ Não | ✅ Sim |
| **Multiple Databases** | ❌ Não | ✅ Pode ter |
| **Consistency** | ✅ Imediata | ⚠️ Eventual |
| **Complexity** | 🟡 Média | 🔴 Alta |
| **Learning Curve** | 🟡 Moderada | 🔴 Íngreme |
| **Use Cases** | Interface clara | ✅ Commands/Queries |
| **Presenters** | ✅ Sim | ❌ Geralmente não |

---

## 🎓 Conclusão

**Clean Architecture (Boundaries)** e **CQRS** são padrões complementares, não excludentes:

- **Clean Architecture** foca na **estrutura geral** e independência
- **CQRS** foca na **otimização** de leitura/escrita

Você pode:

1. Usar **só Clean Architecture** (mais comum, nossa implementação)
2. Usar **só CQRS** (raro, geralmente complexo demais)
3. **Combinar ambos** (ideal para sistemas grandes)

Na prática, muitas aplicações começam com Clean Architecture e evoluem para CQRS apenas nas áreas que realmente precisam de otimização de leitura/escrita.

---

**Referências:**

- "Clean Architecture" - Robert C. Martin
- "CQRS Documents" - Greg Young
- "Implementing Domain-Driven Design" - Vaughn Vernon