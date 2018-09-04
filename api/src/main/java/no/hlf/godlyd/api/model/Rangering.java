package no.hlf.godlyd.api.model;

public enum Rangering {

    NED(-1),
    INGEN(0),
    OPP(1);

    private final int value;

    Rangering(final int newValue) {
        value = newValue;
    }

    public int getValue() {
        return value;
    }
}
