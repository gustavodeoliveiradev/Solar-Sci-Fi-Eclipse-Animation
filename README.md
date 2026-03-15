![GitHub last commit](https://img.shields.io/github/last-commit/gustavodeoliveiradev/Solar-Sci-Fi-Eclipse-Animation?style=for-the-badge&color=00f2ff)
![GitHub repo size](https://img.shields.io/github/repo-size/gustavodeoliveiradev/Solar-Sci-Fi-Eclipse-Animation?style=for-the-badge&color=ff00ff)
![License](https://img.shields.io/github/license/gustavodeoliveiradev/Solar-Sci-Fi-Eclipse-Animation?style=for-the-badge&color=green)

# 🌌 Neon Eclipse Protocol

> **Status do Protocolo:** Operacional 🚀  
> Uma experiência imersiva de Front-End focada em animações sincronizadas, design responsivo intrínseco e manipulação avançada de DOM.

## 🚀 Demonstração Visual

![Preview do Projeto](/img/img.png)

Acesse o sistema em tempo real: [**Explorar o Neon Eclipse**](https://gustavodeoliveiradev.github.io/Solar-Sci-Fi-Eclipse-Animation/)

---

## 🛠️ Stack Tecnológica & Diferenciais

### **Core**
- **HTML5 Semântico**: Estruturação de controles e containers de áudio nativos.
- **CSS3 Moderno**: 
    - **Design Intrínseco**: Uso de `min(60vw, 60vh)` para garantir geometria circular perfeita sem Media Queries excessivas.
    - **Animações Sincronizadas**: `@keyframes` complexos com múltiplos estágios para efeitos de Glitch e Eclipse.
- **JavaScript ES6+**: 
    - **Event Normalization**: Lógica unificada para `Mouse` e `Touch` (Parallax).
    - **Audio Management**: Implementação de *Fade-Out* algorítmico e gatilhos baseados em `animationiteration`.

---

## 🧬 Dissecando a Engenharia (Deep Dive)

Como um estudo aprofundado, o projeto focou em resolver três desafios principais:

### 1. Sincronia Audiovisual (O Maestro)
Diferente de loops simples, o som de "Glitch" é disparado exatamente aos **91%** da animação CSS. Isso foi alcançado monitorando o ciclo da animação via JS e aplicando um `setTimeout` calculado sobre o `animation-duration`.

### 2. Parallax de Alta Performance
As estrelas utilizam `will-change: transform` para forçar a renderização via GPU, garantindo que o cálculo de posição (baseado em porcentagem da Viewport) rode a **60 FPS** mesmo em dispositivos móveis.

### 3. Gerenciamento de Estado Dinâmico
Utilização de **CSS Variables** injetadas via JavaScript para permitir que o usuário altere o tema de cor de todo o sistema (Lua, Brilho, Botões e Bordas) em tempo real através de um único ponto de controle (`:root`).

---

## 📱 Protocolo de Responsividade
- **Desktop**: Experiência completa com Parallax de alta precisão.
- **Mobile**: Normalização de eventos de toque para evitar o scroll nativo durante a interação.
- **Landscape**: Adaptação dinâmica para visualização horizontal em dispositivos pequenos.

---

## 👤 Desenvolvedor
**GusDev** - [GitHub](https://github.com/gustavodeoliveiradev) | [LinkedIn](https://linkedin.com/in/lgustavodeoliveira)

> *"Estudando para superar meus limites, estilo Gohan."* 🐉

---
Desenvolvido com ❤️ como parte do meu laboratório de estudos avançados.