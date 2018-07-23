package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "lydforholdvurdering")
public class LydforholdVurdering extends Vurdering {

    @NotNull
    private boolean rangering;  // Kan rangeres som tommel opp (1) eller ned (0)

    public LydforholdVurdering(Sted sted, Bruker registrator, String kommentar, boolean rangering){
        super(sted, registrator, kommentar);
        this.rangering = rangering;
    }

    public LydforholdVurdering(){}

    // Getters and setters
    public boolean isRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }


}
