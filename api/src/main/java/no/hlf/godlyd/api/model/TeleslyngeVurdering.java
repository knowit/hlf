package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "teleslynge_vurdering")
//@JsonTypeName("teleslynge")
public class TeleslyngeVurdering extends Vurdering {

    @NotNull
    private boolean rangering;  // Kan rangeres som tommel opp (1) eller ned (0)
    private String modell;    // den spesifikke modellen til utstyret
    @Column(name = "type_slynge")
    private String typeSlynge;    // type teleslynge (fastmontert, mobil osv.)

    public TeleslyngeVurdering(Sted sted, Bruker registrator, String kommentar, boolean rangering,
                               String modell, String type){
        super(sted, registrator, kommentar);
        this.rangering = rangering;
        this.modell = modell;
        this.typeSlynge = type;
    }

    public TeleslyngeVurdering(){}

    // Getters and setters
    public boolean getRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }

    public String getModell() {
        return modell;
    }

    public void setModell(String modell) {
        this.modell = modell;
    }

    public String getTypeSlynge() {
        return typeSlynge;
    }

    public void setTypeSlynge(String type) {
        this.typeSlynge = type;
    }
}
