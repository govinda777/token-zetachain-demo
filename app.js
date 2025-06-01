// ZetaChain Token → Pitch Lucy Application JavaScript

class TokenProjectApp {
    constructor() {
        this.completedSteps = new Set();
        this.totalSteps = 5;
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupStepCards();
        this.setupCodeSection();
        this.setupDeploySection();
        this.setupPitchSection();
        this.updateProgress();
    }

    // Tab Navigation
    setupTabNavigation() {
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Step Cards Functionality
    setupStepCards() {
        // Setup toggle functionality
        const toggleButtons = document.querySelectorAll('.step-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const stepNumber = button.dataset.step;
                this.toggleStepContent(stepNumber);
            });
        });

        // Setup step header click
        const stepHeaders = document.querySelectorAll('.step-header');
        stepHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const stepCard = header.closest('.step-card');
                const stepNumber = stepCard.dataset.step;
                this.toggleStepContent(stepNumber);
            });
        });

        // Setup complete step buttons
        const completeButtons = document.querySelectorAll('.complete-step');
        completeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const stepNumber = parseInt(button.dataset.step);
                this.completeStep(stepNumber);
            });
        });
    }

    toggleStepContent(stepNumber) {
        const stepCard = document.querySelector(`[data-step="${stepNumber}"]`);
        const stepContent = stepCard.querySelector('.step-content');
        const toggleButton = stepCard.querySelector('.step-toggle');

        stepContent.classList.toggle('expanded');
        toggleButton.classList.toggle('expanded');
    }

    completeStep(stepNumber) {
        const stepCard = document.querySelector(`[data-step="${stepNumber}"]`);
        const statusElement = document.getElementById(`status-${stepNumber}`);
        const button = stepCard.querySelector('.complete-step');

        if (this.completedSteps.has(stepNumber)) {
            // Uncomplete step
            this.completedSteps.delete(stepNumber);
            stepCard.classList.remove('completed');
            statusElement.textContent = '⏳';
            button.textContent = 'Marcar como Completo';
            button.classList.remove('completed');
        } else {
            // Complete step
            this.completedSteps.add(stepNumber);
            stepCard.classList.add('completed');
            statusElement.textContent = '✅';
            button.textContent = 'Completo!';
            button.classList.add('completed');
        }

        this.updateProgress();
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const progress = (this.completedSteps.size / this.totalSteps) * 100;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Completo`;
    }

    // Code Section Functionality
    setupCodeSection() {
        // Copy code button
        const copyCodeButton = document.querySelector('.copy-code');
        if (copyCodeButton) {
            copyCodeButton.addEventListener('click', () => {
                const targetId = copyCodeButton.dataset.target;
                const codeElement = document.getElementById(targetId);
                this.copyToClipboard(codeElement.textContent, copyCodeButton);
            });
        }

        // Copy command buttons
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.dataset.text;
                this.copyToClipboard(text, button);
            });
        });
    }

    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '✅';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            // Fallback for older browsers
            this.fallbackCopyTextToClipboard(text, button);
        });
    }

    fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            const originalText = button.textContent;
            button.textContent = '✅';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Deploy Section Functionality
    setupDeploySection() {
        const deployButton = document.getElementById('deploy-btn');
        const statusList = document.getElementById('deploy-status-list');
        const contractAddressDiv = document.getElementById('contract-address');
        const contractAddressText = document.getElementById('contract-address-text');
        const copyAddressButton = document.getElementById('copy-address');

        deployButton.addEventListener('click', () => {
            this.simulateDeployment(deployButton, statusList, contractAddressDiv, contractAddressText);
        });

        if (copyAddressButton) {
            copyAddressButton.addEventListener('click', () => {
                this.copyToClipboard(contractAddressText.textContent, copyAddressButton);
            });
        }
    }

    async simulateDeployment(button, statusList, addressDiv, addressText) {
        const tokenName = document.getElementById('token-name').value;
        const tokenSymbol = document.getElementById('token-symbol').value;
        const tokenSupply = document.getElementById('token-supply').value;

        if (!tokenName || !tokenSymbol || !tokenSupply) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        button.disabled = true;
        button.textContent = 'Deployando...';
        button.classList.add('loading');

        const steps = [
            { text: 'Compilando contrato...', delay: 1000 },
            { text: 'Conectando à rede ZetaChain...', delay: 1500 },
            { text: 'Enviando transação...', delay: 2000 },
            { text: 'Aguardando confirmação...', delay: 2500 },
            { text: 'Deploy concluído com sucesso!', delay: 1000 }
        ];

        statusList.innerHTML = '';

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            const statusItem = document.createElement('div');
            statusItem.className = 'status-item processing';
            statusItem.innerHTML = `
                <span class="status-icon">⏳</span>
                <span>${step.text}</span>
            `;
            statusList.appendChild(statusItem);

            await this.delay(step.delay);

            statusItem.className = 'status-item success';
            statusItem.querySelector('.status-icon').textContent = '✅';
        }

        // Generate fake contract address
        const contractAddress = this.generateFakeAddress();
        addressText.textContent = contractAddress;
        addressDiv.style.display = 'block';

        button.disabled = false;
        button.textContent = '🚀 Deploy Realizado!';
        button.classList.remove('loading');
        button.classList.add('completed');

        // Auto-complete step 4 if all steps are configured
        if (this.completedSteps.size >= 3) {
            this.completeStep(4);
        }
    }

    generateFakeAddress() {
        const chars = '0123456789abcdef';
        let result = '0x';
        for (let i = 0; i < 40; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Pitch Section Functionality
    setupPitchSection() {
        const loadExampleButton = document.getElementById('load-example');
        const submitPitchButton = document.getElementById('submit-pitch');
        const pitchTextarea = document.getElementById('pitch-text');
        const lucyResponse = document.getElementById('lucy-response');
        const responseContent = document.getElementById('response-content');

        const examplePitch = `Lucy, apresento o MTB (Meu Token Básico) - um token construído na arquitetura Universal da ZetaChain.

🔗 Vantagens Técnicas:
- Interoperabilidade nativa entre Bitcoin, Ethereum e BNB Chain
- Sem necessidade de pontes tradicionais ou wrapping
- Transferências cross-chain automáticas via protocolo ZetaChain

💡 Proposta de Valor:
- Simplicidade: uma interface unificada para múltiplas blockchains
- Eficiência: menores custos de transação cross-chain
- Segurança: validado pela rede ZetaChain com proof-of-stake

📊 Potencial de Mercado:
O MTB representa a próxima evolução em tokens universais, eliminando a fragmentação atual do ecossistema cripto. Com a ZetaChain conectando as maiores blockchains nativamente, o MTB oferece acesso fluido a bilhões em liquidez distribuída.`;

        loadExampleButton.addEventListener('click', () => {
            pitchTextarea.value = examplePitch;
            pitchTextarea.focus();
        });

        submitPitchButton.addEventListener('click', () => {
            this.submitPitch(pitchTextarea.value, submitPitchButton, lucyResponse, responseContent);
        });
    }

    async submitPitch(pitchText, button, responseDiv, contentDiv) {
        if (!pitchText.trim()) {
            alert('Por favor, escreva um pitch antes de enviar!');
            return;
        }

        button.disabled = true;
        button.textContent = 'Enviando para Lucy...';
        button.classList.add('loading');

        await this.delay(3000);

        // Simulate Lucy's response (random approval/rejection)
        const approved = Math.random() > 0.3; // 70% chance of approval
        
        let response;
        let responseClass;

        if (approved) {
            response = `🎉 <strong>Parabéns! Seu token foi APROVADO pela Lucy AI!</strong><br><br>
            
            <strong>Pontuação:</strong> 8.5/10<br><br>
            
            <strong>Comentários da Lucy:</strong><br>
            "Excelente proposta! O MTB demonstra uma compreensão sólida dos benefícios da arquitetura Universal da ZetaChain. A ênfase na interoperabilidade nativa e a eliminação de pontes tradicionais são pontos fortes convincentes. O pitch é bem estruturado e destaca claramente o valor único do projeto."<br><br>
            
            <strong>Próximos Passos:</strong><br>
            • Seu token foi adicionado ao portfólio da Lucy<br>
            • Você receberá atualizações sobre oportunidades de listagem<br>
            • Considere expandir a documentação técnica<br><br>
            
            <em>Continue desenvolvendo! 🚀</em>`;
            responseClass = 'approved';
        } else {
            response = `❌ <strong>Seu token foi REJEITADO pela Lucy AI</strong><br><br>
            
            <strong>Pontuação:</strong> 4.2/10<br><br>
            
            <strong>Comentários da Lucy:</strong><br>
            "O pitch precisa de melhorias. Embora a tecnologia ZetaChain seja promissora, o token apresentado não demonstra suficiente diferenciação ou casos de uso específicos. Recomendo revisar a proposta de valor e adicionar mais detalhes sobre a utilidade do token."<br><br>
            
            <strong>Sugestões para Melhoria:</strong><br>
            • Defina casos de uso específicos e únicos<br>
            • Adicione mais detalhes sobre tokenomics<br>
            • Demonstre tração ou validação de mercado<br>
            • Melhore a apresentação da equipe e roadmap<br><br>
            
            <em>Não desista! Revise e tente novamente. 💪</em>`;
            responseClass = 'rejected';
        }

        contentDiv.innerHTML = response;
        contentDiv.className = `response-content ${responseClass}`;
        responseDiv.style.display = 'block';

        button.disabled = false;
        button.textContent = approved ? '🎉 Aprovado!' : '🔄 Tentar Novamente';
        button.classList.remove('loading');

        if (approved) {
            button.classList.add('completed');
            this.completeStep(5); // Auto-complete final step if approved
        }

        // Scroll to response
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TokenProjectApp();
});

// Add some utility functions for enhanced UX
function addTooltips() {
    // Add tooltips to various elements
    const tooltipElements = [
        { selector: '.step-icon', text: 'Clique para expandir detalhes' },
        { selector: '.copy-btn', text: 'Copiar para área de transferência' },
        { selector: '.progress-bar', text: 'Progresso geral do projeto' }
    ];

    tooltipElements.forEach(({ selector, text }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.title = text;
        });
    });
}

// Add smooth scrolling for better UX
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    addTooltips();
    addSmoothScrolling();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            const tabs = document.querySelectorAll('.tab');
            const activeTabIndex = Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
            
            if (e.key === 'ArrowLeft' && activeTabIndex > 0) {
                tabs[activeTabIndex - 1].click();
            } else if (e.key === 'ArrowRight' && activeTabIndex < tabs.length - 1) {
                tabs[activeTabIndex + 1].click();
            }
        }
    });
});