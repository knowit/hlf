package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "teleslyngevurdering")
public class TeleslyngeVurdering extends Vurdering {

    @NotNull
    private boolean rangering;  // Kan rangeres som tommel opp (1) eller ned (0)

    public TeleslyngeVurdering(Sted sted, Bruker registrator, String kommentar, boolean rangering){
        super(sted, registrator, kommentar);
        this.rangering = rangering;

        //sted.addVurdering(this);
        //registrator.addVurdering(this);
    }

    public TeleslyngeVurdering(){}

    /*
    @Override
    public String toString() {
        return "TeleslyngeVurdering{ id: " + super.getId() + " registrator: " + super.getRegistrator() +
                "sted: " + super.getSted() + "rangering:" + rangering +
                "dato: " + new SimpleDateFormat("dd/MM/yyy").format(super.getDato()) +
                "kommentar: " + super.getKommentar() + '}';
    }
    */

    // Getters and setters
    public boolean isRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }


}
