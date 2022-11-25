package com.example.demo.enums;

public enum permissionProfileUserEnum {
    PERFIL_REGULAR_USER(1, "Usuário Comum"),
    PERFIL_ROOT_USER(2, "Usuário Administrador");

    private final int _valor;
    private final String _nomeRelatorio;
    permissionProfileUserEnum(int valor, String nomeRelatorio) {
        this._valor = valor;
        this._nomeRelatorio = nomeRelatorio;
    }

    public int getValor() {
        return _valor;
    }

    public String getNomeRelatorio() {
        return _nomeRelatorio;
    }
}
