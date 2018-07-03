package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "lydforhold_vurdering")
//@JsonTypeName("lydforhold")
public class LydforholdVurdering extends Vurdering{

    @NotNull
    private boolean rangering;  // Tommel opp (1) eller ned (0)

    public LydforholdVurdering(Sted sted, Bruker registrator, String kommentar, boolean rangering) {
        super(sted, registrator, kommentar);
        this.rangering = rangering;
    }

    public LydforholdVurdering(){}

    // Getters and setters
    public boolean getRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }
}
