package no.hlf.godlyd.api;

import no.hlf.godlyd.api.model.Vurdering;
import java.util.List;

public class Vurderingsstatistikk {

    private int positive;
    private int negative;

    // Konstruktøren tar inn en liste bestående av én type vurdering (lydforhold, teleslynge, osv...)
    public Vurderingsstatistikk(List<Vurdering> vurderinger){
        this.positive = (int) vurderinger.stream().filter(v -> v.isRangering()).count();
        this.negative = (int) vurderinger.stream().filter(v -> !v.isRangering()).count();
    }

    // Getters and setters
    public int getPositive() {
        return positive;
    }

    public void setPositive(int positive) {
        this.positive = positive;
    }

    public int getNegative() {
        return negative;
    }

    public void setNegative(int negative) {
        this.negative = negative;
    }
}
