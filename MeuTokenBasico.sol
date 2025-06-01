// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@zetachain/standard-contracts/contracts/token/contracts/zetachain/UniversalToken.sol";

/**
 * @title MeuTokenBasico
 * @dev Implementação mais simples possível de um Universal Token na ZetaChain
 * Este token pode ser transferido nativamente entre chains conectadas
 */
contract MeuTokenBasico is UniversalToken {
    // O contrato herda toda a funcionalidade do UniversalToken
    // Não precisa de implementação adicional para funcionalidade básica
}
