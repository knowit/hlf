package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "vurderinger")
@EntityListeners(AuditingEntityListener.class)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "typeVurdering")
@JsonSubTypes({
        @JsonSubTypes.Type(value = TeleslyngeVurdering.class, name = "teleslynge"),
        @JsonSubTypes.Type(value = LydforholdVurdering.class, name = "lydforhold")})
public abstract class Vurdering implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //private String typeVurdering; // typen vurdering (teleslynge, lydforhold osv.)

    @ManyToOne
    @JoinColumn(name = "sted")
    private Sted sted;

    @ManyToOne
    @JoinColumn(name = "registrator")
    private Bruker registrator;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date dato;

    private String kommentar;

    protected Vurdering(Sted sted, Bruker registrator, String kommentar) {
        this.sted = sted;
        this.registrator = registrator;
        this.kommentar = kommentar;
    }

    protected  Vurdering(){}

    public abstract boolean getRangering();

    //Getters and setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Sted getSted() { return sted; }

    public void setSted(Sted sted) { this.sted = sted; }

    /*
    public String getTypeVurdering() { return typeVurdering; }

    public void setTypeVurdering(String type) { this.typeVurdering = type; }
    */
    public Bruker getRegistrator() { return registrator; }

    public void setRegistrator(Bruker registrator) { this.registrator = registrator; }

    public Date getDato() { return dato; }

    public void setDato(Date dato) { this.dato = dato; }

    public String getKommentar() { return kommentar; }

    public void setKommentar(String kommentar) { this.kommentar = kommentar; }
}
