package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "lydutjevningvurdering")
public class LydutjevningVurdering extends Vurdering {

    @NotNull
    private boolean rangering;  // Kan rangeres som tommel opp (1) eller ned (0)

    public LydutjevningVurdering(Sted sted, Bruker registrator, String kommentar, boolean rangering){
        super(sted, registrator, kommentar);
        this.rangering = rangering;
    }

    public LydutjevningVurdering(){}

    // Getters and setters
    public boolean isRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }


}
