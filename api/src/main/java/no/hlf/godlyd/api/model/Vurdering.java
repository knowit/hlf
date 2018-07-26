package no.hlf.godlyd.api.model;


import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonTypeInfo.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "vurdering")
@EntityListeners(AuditingEntityListener.class)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonIgnoreProperties(value = "dato", allowGetters = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = InformasjonVurdering.class, name = "InformasjonVurdering"),
        @JsonSubTypes.Type(value = LydforholdVurdering.class, name = "LydforholdVurdering"),
        @JsonSubTypes.Type(value = LydutjevningVurdering.class, name = "LydutjevningVurdering"),
        @JsonSubTypes.Type(value = TeleslyngeVurdering.class, name = "TeleslyngeVurdering"),

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
    @Temporal(TemporalType.DATE)
    @LastModifiedDate
    private Date dato;

    private String kommentar;

    @NotNull
    private boolean rangering;

    protected Vurdering(Sted sted, Bruker registrator, String kommentar, boolean rangering) {
        this.sted = sted;
        this.registrator = registrator;
        this.kommentar = kommentar;
        this.rangering = rangering;
    }

    protected Vurdering(){}


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

    public Date getDato() {
        return dato;
    }

    public void setDato(Date dato) { this.dato = dato; }

    public String getKommentar() { return kommentar; }

    public void setKommentar(String kommentar) { this.kommentar = kommentar; }

    public boolean isRangering() {
        return rangering;
    }

    public void setRangering(boolean rangering) {
        this.rangering = rangering;
    }
}
