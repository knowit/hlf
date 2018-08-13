package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "vurdering")
@EntityListeners(AuditingEntityListener.class)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonIgnoreProperties(value = "dato", allowGetters = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = TeleslyngeVurdering.class, name = "Teleslyngevurdering"),
        @JsonSubTypes.Type(value = LydforholdVurdering.class, name = "Lydforholdvurdering"),
        @JsonSubTypes.Type(value = LydutjevningVurdering.class, name = "Lydutjevningvurdering"),
        @JsonSubTypes.Type(value = InformasjonVurdering.class, name = "Informasjonvurdering")
})
public abstract class Vurdering implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sted")
    private Sted sted;

    @ManyToOne
    @JoinColumn(name = "registrator")
    private Bruker registrator;

    @Column(nullable = false)
    private LocalDate dato;

    private String kommentar;

    protected Vurdering(Sted sted, Bruker registrator, String kommentar) {
        this.sted = sted;
        this.registrator = registrator;
        this.kommentar = kommentar;
    }

    protected Vurdering(){}

    public abstract boolean isRangering();
    public abstract void setRangering(boolean rangering);

    //Getters and setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Sted getSted() { return sted; }

    public void setSted(Sted sted) {
        this.sted = sted;
    }

    public Bruker getRegistrator() { return registrator; }

    public void setRegistrator(Bruker registrator) {
        this.registrator = registrator;
    }

    public LocalDate getDato() {
        return dato;
    }

    public void setDato(LocalDate dato) { this.dato = dato; }

    public String getKommentar() { return kommentar; }

    public void setKommentar(String kommentar) { this.kommentar = kommentar; }
}
