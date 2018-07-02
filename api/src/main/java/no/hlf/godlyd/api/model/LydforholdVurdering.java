package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "lydforhold_vurdering")
public class LydforholdVurdering extends Vurdering{


    @NotNull
    private boolean rangering;  // Tommel opp (1) eller ned (0)

    // Getters and setters
    public boolean isRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }
}
