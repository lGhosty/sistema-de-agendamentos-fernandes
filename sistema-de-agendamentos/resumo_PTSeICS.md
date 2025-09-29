# Resumo – Princípios de Testes de Software e Code Smells em Testes

## 1. Princípios de Testes de Software

### 1.1 Testes devem ser repetíveis
- **Bom padrão:** testes produzem o mesmo resultado em qualquer ambiente.
```ts
// ✅ Bom exemplo
const result = soma(2, 2);
expect(result).toBe(4);
```
- **Mau padrão:** testes dependem de fatores externos (hora do sistema, rede, etc.).
```ts
// ❌ Mau exemplo
const agora = new Date().getSeconds();
expect(agora).toBe(30);
```

### 1.2 Testes devem ser independentes
- **Bom padrão:** cada teste prepara seu próprio cenário.
```ts
beforeEach(() => limparBancoDeDados());
```
- **Mau padrão:** um teste depende do resultado de outro.
```ts
// ❌ Se o teste de criar usuário falhar, o de buscar também falha
it("busca usuário criado", () => { ... });
```

### 1.3 Testes devem ser rápidos
- **Bom padrão:** uso de repositórios em memória.
```ts
const repo = new InMemoryUsersRepository();
```
- **Mau padrão:** acesso a banco real ou chamadas HTTP.
```ts
await fetch("https://api.externa.com");
```

### 1.4 Testes devem ter feedback claro
- **Bom padrão:** mensagens de erro explícitas.
```ts
expect(() => criarUsuario(null)).toThrow("Nome inválido");
```
- **Mau padrão:** falhas sem explicação.
```ts
expect(resultado).toBeTruthy();
```

### 1.5 Testes devem ser automatizados
- **Bom padrão:** suíte executada por comando (ex.: `npm test`).
- **Mau padrão:** testes manuais ou scripts isolados.

---

## 2. Code Smells em Testes

### 2.1 Teste Frágil
- Quebra com pequenas mudanças de implementação.
```ts
// ❌ Mau exemplo: verifica detalhes internos
expect(usuarioRepo[0]._id).toBe("123");
```
```ts
// ✅ Bom exemplo: verifica apenas comportamento esperado
expect(usuario.id).toBe("123");
```

### 2.2 Teste Lento
- Usa recursos externos desnecessários.
```ts
// ❌ Mau exemplo
await conexaoBancoReal.query("SELECT * FROM usuarios");
```
```ts
// ✅ Bom exemplo
await repoEmMemoria.buscarTodos();
```

### 2.3 Teste Irrelevante
- Verifica algo que não agrega valor.
```ts
// ❌ Mau exemplo
expect(2 + 2).toBe(4);
```

### 2.4 Duplicação de Código
- **Mau padrão:** setup repetido em todos os testes.
```ts
const repo = new InMemoryRepo();
const service = new UserService(repo);
```
- **Bom padrão:** uso de `beforeEach`.
```ts
let repo: InMemoryRepo;
let service: UserService;

beforeEach(() => {
  repo = new InMemoryRepo();
  service = new UserService(repo);
});
```

### 2.5 Asserções Excessivas
- **Mau padrão:** um único teste verifica várias coisas ao mesmo tempo.
```ts
// ❌ Mau exemplo
expect(user.nome).toBe("Ana");
expect(user.idade).toBe(20);
expect(user.ativo).toBeTruthy();
```
- **Bom padrão:** dividir em testes menores e específicos.
```ts
it("deve ter nome válido", ...);
it("deve ter idade válida", ...);
```

---

## 📌 Conclusão
Seguindo os princípios (repetibilidade, independência, rapidez, clareza e automação) e evitando code smells (fragilidade, lentidão, irrelevância, duplicação e excesso de asserções), garantimos que os testes sejam **confiáveis, úteis e fáceis de manter**.

